import {
  Menu as MenuModel,
  ProductsOnMenu as ProductsOnMenuModel,
  CategoriesOnMenu as CategoriesOnMenuModel,
} from '@prisma/client';

export type Menu = Omit<
  MenuModel,
  'createdAt' | 'updatedAt' | 'organizationId'
>;

export interface CreateMenu {
  name: string;
  description?: string;
}
export interface UpdateMenu {
  name: string;
  description?: string;
}

export type ProductsOnMenu = ProductsOnMenuModel;

export type CategoriesOnMeny = CategoriesOnMenuModel;
