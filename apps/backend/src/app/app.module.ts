import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UtilsModule } from './utils/utils.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { OrganizationModule } from './organization/organization.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UtilsModule,
    AuthModule,
    UserModule,
    OrganizationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
