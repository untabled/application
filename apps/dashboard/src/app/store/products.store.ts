import { Injectable } from '@angular/core';
import { EntityStore } from './entity.store';
import { Product } from '@untabled/types';

@Injectable({
  providedIn: 'root',
})
export class ProductsStore extends EntityStore<Product> {}
