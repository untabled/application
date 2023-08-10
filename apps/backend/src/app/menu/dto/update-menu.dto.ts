import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { UpdateMenu } from '@untabled/types';

export class UpdateMenuDto implements UpdateMenu {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description?: string;
}
