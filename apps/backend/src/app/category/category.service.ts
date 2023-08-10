import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../utils/prisma/prisma.service';
import { PermissionsService } from '../utils/permissions/permissions.service';
import { Category } from '@untabled/types';

export const CategorySelect = {
  id: true,
  name: true,
  description: true,
};

@Injectable()
export class CategoryService {
  constructor(
    private prisma: PrismaService,
    private permissions: PermissionsService
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
    organizationId: string,
    userId: string
  ): Promise<Category> {
    await this.permissions.validatePermissions({ organizationId, userId });

    return this.prisma.category.create({
      select: CategorySelect,
      data: {
        ...createCategoryDto,
        organizationId,
      },
    });
  }

  async findAll(organizationId: string, userId: string): Promise<Category[]> {
    await this.permissions.validatePermissions({ organizationId, userId });

    return this.prisma.category.findMany({
      select: CategorySelect,
      where: {
        organizationId,
      },
    });
  }

  async findOne(
    id: string,
    organizationId: string,
    userId: string
  ): Promise<Category> {
    await this.permissions.validatePermissions({ organizationId, userId });

    const category = await this.prisma.category.findUnique({
      select: CategorySelect,
      where: {
        id,
      },
    });

    if (!category) throw new NotFoundException();

    return category;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
    organizationId: string,
    userId: string
  ): Promise<Category> {
    await this.permissions.validatePermissions({ organizationId, userId });

    const category = await this.prisma.category.findUnique({
      select: CategorySelect,
      where: {
        id,
      },
    });

    if (!category) throw new NotFoundException();

    return this.prisma.category.update({
      select: CategorySelect,
      where: {
        id,
      },
      data: updateCategoryDto,
    });
  }

  async remove(
    id: string,
    organizationId: string,
    userId: string
  ): Promise<boolean> {
    await this.permissions.validatePermissions({ organizationId, userId });

    const category = await this.prisma.category.findUnique({
      select: CategorySelect,
      where: {
        id,
      },
    });

    if (!category) throw new NotFoundException();

    await this.prisma.category.delete({
      where: {
        id,
      },
    });

    return true;
  }
}
