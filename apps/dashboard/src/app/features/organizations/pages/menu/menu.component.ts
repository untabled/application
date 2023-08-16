import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit,
  inject,
} from '@angular/core';
import {
  CategoriesService,
  MenusService,
  OrganizationsService,
  ProductsService,
} from '../../../../core';
import { map, switchMap } from 'rxjs';
import { Organization } from '@untabled/types';
import { MenusStore } from '../../../../store';

@Component({
  selector: 'untabled-menu',
  templateUrl: './menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit {
  #menusService = inject(MenusService);
  #categoriesService = inject(CategoriesService);
  #productsService = inject(ProductsService);
  #organizationsService = inject(OrganizationsService);

  #menusStore = inject(MenusStore);

  readonly menus$ = this.#menusStore.entities$;

  @HostBinding('class')
  get classes() {
    return 'flex';
  }

  ngOnInit(): void {
    this.#fetchMenus();
    this.#fetchProducts();
    this.#fetchCategories();
  }

  #fetchMenus() {
    this.#organizationsService.activeOrganization$
      .pipe(
        map((organization) => (organization as Organization).id),
        switchMap((id) => this.#menusService.fetchMenus(id))
      )
      .subscribe();
  }

  #fetchProducts() {
    this.#organizationsService.activeOrganization$
      .pipe(
        map((organization) => (organization as Organization).id),
        switchMap((id) => this.#productsService.fetchProducts(id))
      )
      .subscribe();
  }

  #fetchCategories() {
    this.#organizationsService.activeOrganization$
      .pipe(
        map((organization) => (organization as Organization).id),
        switchMap((id) => this.#categoriesService.fetchCategories(id))
      )
      .subscribe();
  }
}
