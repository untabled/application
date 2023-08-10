import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UtilsModule } from './utils/utils.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { OrganizationModule } from './organization/organization.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UtilsModule,
    AuthModule,
    UserModule,
    OrganizationModule,
    CategoryModule,
    ProductModule,
    MenuModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
