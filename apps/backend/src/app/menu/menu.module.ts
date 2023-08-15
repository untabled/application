import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { PermissionsModule, PrismaModule } from '../utils';

@Module({
  imports: [PrismaModule, PermissionsModule],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
