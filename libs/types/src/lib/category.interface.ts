import { Category as CategoryModel } from '@prisma/client';

export type Category = Omit<
  CategoryModel,
  'createdAt' | 'updatedAt' | 'organizationId'
>;

export interface CreateCategory {
  name: string;
}

export interface UpdateCategory {
  name: string;
}
