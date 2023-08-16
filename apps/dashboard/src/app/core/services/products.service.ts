import { Injectable, inject } from '@angular/core';
import { ProductsFacade } from '../facades';
import { ProductsStore } from '../../store';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  #productsFacade = inject(ProductsFacade);
  #productsStore = inject(ProductsStore);

  fetchProducts(organizationId: string) {
    return this.#productsFacade
      .get(organizationId)
      .pipe(tap((products) => this.#productsStore.set(products)));
  }
}
