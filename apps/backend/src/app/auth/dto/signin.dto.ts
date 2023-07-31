import { IsEmail, IsNotEmpty } from '@nestjs/class-validator';
import { SignIn } from '@untabled/types';

export class SignInDto implements SignIn {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
