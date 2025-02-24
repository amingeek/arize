import { IsString, Length } from 'class-validator';

export class StartSessionDto {
  @IsString()
  @Length(5, 50)
  sessionId: string;

  @IsString()
  @Length(3, 100)
  topic: string;
}
