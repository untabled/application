import { Injectable, inject } from '@angular/core';
import { CategoriesFacade } from '../facades';
import { CategoriesStore } from '../../store';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  #categoriesFacade = inject(CategoriesFacade);
  #categoriesStore = inject(CategoriesStore);

  fetchCategories(organizationId: string) {
    return this.#categoriesFacade
      .get(organizationId)
      .pipe(tap((categories) => this.#categoriesStore.set(categories)));
  }
}
