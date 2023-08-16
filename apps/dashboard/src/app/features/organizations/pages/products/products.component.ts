import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductsStore } from '../../../../store';

@Component({
  selector: 'untabled-products',
  templateUrl: './products.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  #productsStore = inject(ProductsStore);

  readonly products$ = this.#productsStore.entities$;
}
