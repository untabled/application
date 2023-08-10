import { Menu as MenuModel } from '@prisma/client';
import { Product } from './product.interface';
import { Category } from './category.interface';

export interface Menu
  extends Omit<MenuModel, 'createdAt' | 'updatedAt' | 'organizationId'> {
  products?: Product[];
  categories?: Category[];
}

export interface CreateMenu {
  name: string;
  description?: string;
}
export interface UpdateMenu {
  name: string;
  description?: string;
}
