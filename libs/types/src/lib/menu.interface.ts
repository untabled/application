import { Menu as MenuModel } from '@prisma/client';
import { Product } from './product.interface';
import { Category } from './category.interface';

export type Menu = Omit<
  MenuModel,
  'createdAt' | 'updatedAt' | 'organizationId'
>;

export interface CompleteMenu extends Menu {
  productsOnMenu: {
    product: Product;
  }[];
  categoriesOnMenu: {
    category: Category;
  }[];
}

export interface CreateMenu {
  name: string;
  description?: string;
}
export interface UpdateMenu {
  name: string;
  description?: string;
}
