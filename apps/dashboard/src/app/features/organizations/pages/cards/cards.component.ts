import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MenusStore } from '../../../../store';

@Component({
  selector: 'untabled-cards',
  templateUrl: './cards.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsComponent {
  #menusStore = inject(MenusStore);

  readonly menus$ = this.#menusStore.entities$;
}
