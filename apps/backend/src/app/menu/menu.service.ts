import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { PrismaService } from '../utils/prisma/prisma.service';
import { PermissionsService } from '../utils/permissions/permissions.service';
import { ProductSelect } from '../product/product.service';
import { CategorySelect } from '../category/category.service';
import { Menu, ProductsOnMenu } from '@untabled/types';
import { CategoriesOnMenu } from '@prisma/client';

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

  async findAll(organizationId: string, userId: string): Promise<Menu[]> {
    await this.permissions.validatePermissions({ organizationId, userId });

    return this.prisma.menu.findMany({
      select: MenuSelect,
      where: {
        organizationId,
      },
    });
  }

  async findOne(
    id: string,
    organizationId: string,
    userId: string
  ): Promise<Menu> {
    await this.permissions.validatePermissions({ organizationId, userId });

    const menu = await this.prisma.menu.findUnique({
      select: {
        ...MenuSelect,
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
      select: MenuSelect,
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

  async addProduct(
    menuId: string,
    productId: string,
    organizationId: string,
    userId: string
  ): Promise<ProductsOnMenu> {
    await this.permissions.validatePermissions({ organizationId, userId });

    const menu = await this.prisma.menu.findUnique({
      where: {
        id: menuId,
      },
    });

    if (!menu) throw new NotFoundException();

    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product)
      throw new NotFoundException(`Product ${productId} doesn't exist`);

    return this.prisma.productsOnMenu.create({
      data: {
        menuId,
        productId,
      },
    });
  }
  async removeProduct(
    menuId: string,
    productId: string,
    organizationId: string,
    userId: string
  ): Promise<boolean> {
    await this.permissions.validatePermissions({ organizationId, userId });

    const menu = await this.prisma.menu.findUnique({
      where: {
        id: menuId,
      },
    });

    if (!menu) throw new NotFoundException();

    const productOnMenu = await this.prisma.productsOnMenu.findUnique({
      where: {
        menuId_productId: {
          menuId,
          productId,
        },
      },
    });

    if (!productOnMenu)
      throw new NotFoundException(
        `Product ${productId} doesn't exist on the given menu`
      );

    await this.prisma.productsOnMenu.delete({
      where: {
        menuId_productId: {
          menuId,
          productId,
        },
      },
    });

    return true;
  }

  async listProducts(menuId: string, organizationId: string, userId: string) {
    await this.permissions.validatePermissions({ organizationId, userId });

    const menu = await this.prisma.menu.findUnique({
      where: {
        id: menuId,
      },
    });

    if (!menu) throw new NotFoundException();

    return this.prisma.productsOnMenu.findMany({
      select: {
        productId: true,
      },
      where: {
        menuId,
      },
    });
  }

  async addCategory(
    menuId: string,
    categoryId: string,
    organizationId: string,
    userId: string
  ): Promise<CategoriesOnMenu> {
    await this.permissions.validatePermissions({ organizationId, userId });

    const menu = await this.prisma.menu.findUnique({
      where: {
        id: menuId,
      },
    });

    if (!menu) throw new NotFoundException();

    const category = await this.prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category)
      throw new NotFoundException(`Category ${categoryId} doesn't exist`);

    return this.prisma.categoriesOnMenu.create({
      data: {
        menuId,
        categoryId,
      },
    });
  }

  async removeCategory(
    menuId: string,
    categoryId: string,
    organizationId: string,
    userId: string
  ): Promise<boolean> {
    await this.permissions.validatePermissions({ organizationId, userId });

    const menu = await this.prisma.menu.findUnique({
      where: {
        id: menuId,
      },
    });

    if (!menu) throw new NotFoundException();

    const categoryOnMenu = await this.prisma.categoriesOnMenu.findUnique({
      where: {
        menuId_categoryId: {
          menuId,
          categoryId,
        },
      },
    });

    if (!categoryOnMenu)
      throw new NotFoundException(
        `Category ${categoryId} doesn't exist on the given menu`
      );

    await this.prisma.categoriesOnMenu.delete({
      where: {
        menuId_categoryId: {
          menuId,
          categoryId,
        },
      },
    });

    return true;
  }

  async listCategories(menuId: string, organizationId: string, userId: string) {
    await this.permissions.validatePermissions({ organizationId, userId });

    const menu = await this.prisma.menu.findUnique({
      where: {
        id: menuId,
      },
    });

    if (!menu) throw new NotFoundException();

    return this.prisma.categoriesOnMenu.findMany({
      select: {
        categoryId: true,
      },
      where: {
        menuId,
      },
    });
  }
}
