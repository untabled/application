import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../utils/prisma/prisma.service';
import { PermissionsService } from '../utils/permissions/permissions.service';
import { Product } from '@untabled/types';

export const ProductSelect = {
  id: true,
  name: true,
  description: true,
  categoryId: true,
};

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private permissions: PermissionsService
  ) {}

  async create(
    createProductDto: CreateProductDto,
    organizationId: string,
    userId: string
  ): Promise<Product> {
    await this.permissions.validatePermissions({ organizationId, userId });

    const category = await this.prisma.category.findUnique({
      where: {
        id: createProductDto.categoryId,
      },
    });

    if (!category)
      throw new NotFoundException(
        `Category ${createProductDto.categoryId} not found`
      );

    return this.prisma.product.create({
      select: ProductSelect,
      data: {
        ...createProductDto,
        organizationId,
      },
    });
  }

  async findAll(organizationId: string, userId: string): Promise<Product[]> {
    await this.permissions.validatePermissions({ organizationId, userId });

    return this.prisma.product.findMany({
      select: ProductSelect,
      where: {
        organizationId,
      },
    });
  }

  async findOne(
    id: string,
    organizationId: string,
    userId: string
  ): Promise<Product> {
    await this.permissions.validatePermissions({ organizationId, userId });

    const product = await this.prisma.product.findUnique({
      select: ProductSelect,
      where: { id },
    });

    if (!product) throw new NotFoundException();

    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
    organizationId: string,
    userId: string
  ): Promise<Product> {
    await this.permissions.validatePermissions({ organizationId, userId });

    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) throw new NotFoundException();

    const category = await this.prisma.category.findUnique({
      where: {
        id: updateProductDto.categoryId,
      },
    });

    if (!category)
      throw new NotFoundException(
        `Category ${updateProductDto.categoryId} not found`
      );

    return this.prisma.product.update({
      select: ProductSelect,
      where: {
        id,
      },
      data: updateProductDto,
    });
  }

  async remove(
    id: string,
    organizationId: string,
    userId: string
  ): Promise<boolean> {
    await this.permissions.validatePermissions({ organizationId, userId });

    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) throw new NotFoundException();

    await this.prisma.product.delete({
      where: { id },
    });

    return true;
  }
}
