import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PermissionsService } from './permissions/permissions.service';

@Global()
@Module({
  providers: [PrismaService, PermissionsService],
  exports: [PrismaService, PermissionsService],
})
export class UtilsModule {}
