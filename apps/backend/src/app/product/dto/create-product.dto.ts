import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { CreateProduct } from '@untabled/types';

export class CreateProductDto implements CreateProduct {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;
}
