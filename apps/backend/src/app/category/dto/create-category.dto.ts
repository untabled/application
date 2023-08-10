import { IsNotEmpty, IsString } from '@nestjs/class-validator';

export class CreateCategoryDto implements CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description?: string;
}
