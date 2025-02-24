import { IsString, Length } from 'class-validator';

export class UserResponseDto {
  @IsString()
  @Length(1, 1000)
  answer: string;

  @IsString()
  @Length(5, 50)
  sessionId: string;
}