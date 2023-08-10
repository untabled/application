import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { CreateMenu } from '@untabled/types';

export class CreateMenuDto implements CreateMenu {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description?: string;
}
