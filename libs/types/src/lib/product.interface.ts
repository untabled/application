import { Product as ProductModel } from '@prisma/client';

export type Product = Omit<
  ProductModel,
  'createdAt' | 'updatedAt' | 'organizationId'
>;

export interface CreateProduct {
  name: string;
  description?: string;
  categoryId: string;
}

export interface UpdateProduct {
  name: string;
  description?: string;
  categoryId: string;
}
