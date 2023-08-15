import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PermissionsModule, PrismaModule } from '../utils';

@Module({
  imports: [PrismaModule, PermissionsModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
