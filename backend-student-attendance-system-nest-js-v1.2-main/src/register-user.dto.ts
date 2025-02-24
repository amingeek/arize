// register-user.dto.ts
import { IsString, IsEmail, IsNotEmpty, MinLength, IsArray, IsOptional } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsArray()
  @IsOptional() // تغییر این خط
  roles?: string[]; // اضافه کردن فیلد roles برای نقش‌های کاربر
}
