import { Product as ProductModel } from '@prisma/client';

export type Product = Omit<
  ProductModel,
  'createdAt' | 'updatedAt' | 'organizationId'
>;

export interface CreateProduct {
  name: string;
  categoryId: string;
}

export interface UpdateProduct {
  name: string;
  categoryId: string;
}
