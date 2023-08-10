import { Category as CategoryModel } from '@prisma/client';

export type Category = Omit<
  CategoryModel,
  'createdAt' | 'updatedAt' | 'organizationId'
>;

export interface CreateCategory {
  name: string;
  description?: string;
}

export interface UpdateCategory {
  name: string;
  description?: string;
}
