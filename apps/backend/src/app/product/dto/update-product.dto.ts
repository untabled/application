import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { UpdateProduct } from '@untabled/types';

export class UpdateProductDto implements UpdateProduct {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description?: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;
}
