import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CategoriesStore } from '../../../../store';

@Component({
  selector: 'untabled-categories',
  templateUrl: './categories.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent {
  #categoriesStore = inject(CategoriesStore);

  readonly categories$ = this.#categoriesStore.entities$;
}
