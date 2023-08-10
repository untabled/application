import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { PrismaService } from '../utils/prisma/prisma.service';
import { PermissionsService } from '../utils/permissions/permissions.service';
import { Organization } from '@untabled/types';

const OrganizationSelect = {
  id: true,
  name: true,
};

@Injectable()
export class OrganizationService {
  constructor(
    private prisma: PrismaService,
    private permissions: PermissionsService
  ) {}

  create(
    createOrganizationDto: CreateOrganizationDto,
    userId: string
  ): Promise<Organization> {
    return this.prisma.organization.create({
      select: OrganizationSelect,
      data: {
        ...createOrganizationDto,
        UsersOrganizations: {
          create: [
            {
              userId,
            },
          ],
        },
      },
    });
  }

  findAll(userId: string): Promise<Organization[]> {
    return this.prisma.organization.findMany({
      select: OrganizationSelect,
      where: {
        UsersOrganizations: {
          some: { userId },
        },
      },
    });
  }

  async findOne(organizationId: string, userId: string): Promise<Organization> {
    const usersOrganization = await this.prisma.usersOrganizations.findUnique({
      where: {
        userId_organizationId: {
          organizationId,
          userId,
        },
      },
      include: {
        organization: {
          select: OrganizationSelect,
        },
      },
    });

    if (!usersOrganization) throw new NotFoundException();

    return usersOrganization.organization;
  }

  async update(
    organizationId: string,
    userId: string,
    updateOrganizationDto: UpdateOrganizationDto
  ): Promise<Organization> {
    await this.permissions.validatePermissions({ organizationId, userId });

    return this.prisma.organization.update({
      select: OrganizationSelect,
      where: {
        id: organizationId,
      },
      data: updateOrganizationDto,
    });
  }

  async remove(organizationId: string, userId: string): Promise<boolean> {
    await this.permissions.validatePermissions({ organizationId, userId });

    await this.prisma.organization.delete({
      where: {
        id: organizationId,
      },
    });

    return true;
  }
}
