import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PermissionsService {
  constructor(private readonly prisma: PrismaService) {}

  async validatePermissions({
    projectId,
    userId,
  }: {
    projectId: string;
    userId: string;
  }) {
    // const userProject = await this.prisma.userProjects.findUnique({
    //   where: {
    //     projectId_userId: {
    //       userId,
    //       projectId,
    //     },
    //   },
    // });
    // if (!userProject) throw new NotFoundException();
  }
}
