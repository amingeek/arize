// user.service.ts
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { RegisterUserDto } from './register-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async registerUser(data: RegisterUserDto, roles: string[] = []) {
    const { username, email, password } = data;

    // بررسی تکراری نبودن ایمیل
    const existingUser = await this.prisma.client.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }

    try {
      const user = await this.prisma.client.user.create({
        data: {
          username,
          email,
          password,
          roles: {
            connect: roles.map((role) => ({ name: role })),
          },
        },
      });

      return user;
    } catch (error) {
      throw new ConflictException('Username is already in use');
    }
  }

  async loginUser(email: string, password: string) {
    const user = await this.prisma.client.user.findUnique({
      where: { email },
      include: { roles: true },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }

  async getUserRoles(userId: number) {
    const user = await this.prisma.client.user.findUnique({
      where: { id: userId },
      include: { roles: true },
    });

    return user?.roles.map((role) => role.name) || [];
  }
}