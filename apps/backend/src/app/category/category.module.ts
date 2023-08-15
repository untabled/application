import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PermissionsModule, PrismaModule } from '../utils';

@Module({
  imports: [PrismaModule, PermissionsModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
