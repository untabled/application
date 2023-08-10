import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { UpdateCategory } from '@untabled/types';

export class UpdateCategoryDto implements UpdateCategory {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description?: string;
}
