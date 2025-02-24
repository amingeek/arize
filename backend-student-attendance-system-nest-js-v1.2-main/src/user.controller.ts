// user.controller.ts
import { Controller, Post, Body, HttpStatus, HttpException, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './register-user.dto';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private userService: UserService) {}

  @Post('register')
  async registerUser(@Body() data: RegisterUserDto, @Body('roles') roles?: string[]) {
    try {
      this.logger.log('Attempting to register user with data:', data);
      const user = await this.userService.registerUser(data, roles);
      this.logger.log('User registered successfully:', user);
      return user;
    } catch (error) {
      this.logger.error('Registration failed:', error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async loginUser(@Body() data: { email: string, password: string }) {
    try {
      this.logger.log('Attempting to login user with email:', data.email);
      const user = await this.userService.loginUser(data.email, data.password);
      this.logger.log('User login successful:', user);
      return user;
    } catch (error) {
      this.logger.error('Login failed:', error.message);
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  // دیگر متدها ...
}
