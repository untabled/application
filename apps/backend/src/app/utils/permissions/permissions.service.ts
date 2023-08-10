import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PermissionsService {
  constructor(private readonly prisma: PrismaService) {}

  async validatePermissions({
    organizationId,
    userId,
  }: {
    organizationId: string;
    userId: string;
  }) {
    const usersOrganizations = await this.prisma.usersOrganizations.findUnique({
      where: {
        userId_organizationId: {
          organizationId,
          userId,
        },
      },
    });

    if (!usersOrganizations) throw new NotFoundException();
  }
}
