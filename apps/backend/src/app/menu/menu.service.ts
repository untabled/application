import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { PrismaService } from '../utils/prisma/prisma.service';
import { PermissionsService } from '../utils/permissions/permissions.service';
import { ProductSelect } from '../product/product.service';
import { CategorySelect } from '../category/category.service';
import { CompleteMenu, Menu } from '@untabled/types';

const MenuSelect = {
  id: true,
  name: true,
  description: true,
};

@Injectable()
export class MenuService {
  constructor(
    private prisma: PrismaService,
    private permissions: PermissionsService
  ) {}

  async create(
    createMenuDto: CreateMenuDto,
    organizationId: string,
    userId: string
  ): Promise<Menu> {
    await this.permissions.validatePermissions({ organizationId, userId });

    return this.prisma.menu.create({
      select: MenuSelect,
      data: {
        ...createMenuDto,
        organizationId,
      },
    });
  }

  async findAll(organizationId: string, userId: string) {
    await this.permissions.validatePermissions({ organizationId, userId });

    return this.prisma.menu.findMany({
      where: {
        organizationId,
      },
    });
  }

  async findOne(
    id: string,
    organizationId: string,
    userId: string
  ): Promise<CompleteMenu> {
    await this.permissions.validatePermissions({ organizationId, userId });

    const menu = await this.prisma.menu.findUnique({
      select: {
        ...MenuSelect,
        productsOnMenu: {
          select: {
            product: { select: ProductSelect },
          },
        },
        categoriesOnMenu: {
          select: {
            category: { select: CategorySelect },
          },
        },
      },
      where: {
        id,
      },
    });

    if (!menu) throw new NotFoundException();

    return menu;
  }

  async update(
    id: string,
    updateMenuDto: UpdateMenuDto,
    organizationId: string,
    userId: string
  ): Promise<Menu> {
    await this.permissions.validatePermissions({ organizationId, userId });

    const menu = await this.prisma.menu.findUnique({
      where: {
        id,
      },
    });

    if (!menu) throw new NotFoundException();

    return this.prisma.menu.update({
      where: {
        id,
      },
      data: updateMenuDto,
    });
  }

  async remove(
    id: string,
    organizationId: string,
    userId: string
  ): Promise<boolean> {
    await this.permissions.validatePermissions({ organizationId, userId });

    const menu = await this.prisma.menu.findUnique({
      where: {
        id,
      },
    });

    if (!menu) throw new NotFoundException();

    await this.prisma.menu.delete({
      where: {
        id,
      },
    });

    return true;
  }
}
