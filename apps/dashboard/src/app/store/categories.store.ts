import { Injectable } from '@angular/core';
import { EntityStore } from './entity.store';
import { Category } from '@untabled/types';

@Injectable({
  providedIn: 'root',
})
export class CategoriesStore extends EntityStore<Category> {}
