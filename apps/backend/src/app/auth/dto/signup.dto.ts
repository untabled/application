import { IsEmail, IsNotEmpty, IsString } from '@nestjs/class-validator';
import { SignUp } from '@untabled/types';

export class SignUpDto implements SignUp {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;
}
