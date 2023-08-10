import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CategoriesFacade,
  OrganizationsFacade,
  OrganizationsService,
  ProductsFacade,
} from '../../core';
import { BehaviorSubject, catchError, map, of, switchMap, tap } from 'rxjs';
import { Category, Product } from '@untabled/types';

@Component({
  selector: 'untabled-organizations',
  templateUrl: './organizations.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationsComponent implements OnInit {
  #route = inject(ActivatedRoute);
  #router = inject(Router);

  #organizationsFacade = inject(OrganizationsFacade);
  #categoriesFacade = inject(CategoriesFacade);
  #productsFacade = inject(ProductsFacade);
  #organizationsService = inject(OrganizationsService);

  categories$ = new BehaviorSubject<Category[] | null>(null);
  products$ = new BehaviorSubject<Product[] | null>(null);

  ngOnInit(): void {
    this.#setActiveOrganization();
    this.#setCategories();
    this.#setProducts();
  }

  #setActiveOrganization() {
    this.#route.params
      .pipe(
        map((params) => params['id']),
        switchMap((id) => this.#organizationsFacade.getById(id)),
        catchError(() => {
          this.#router.navigateByUrl('/dashboard');
          return of();
        }),
        tap((organization) =>
          this.#organizationsService.setActiveOrganization(organization)
        )
      )
      .subscribe();
  }

  #setCategories() {
    this.#route.params
      .pipe(
        map((params) => params['id']),
        switchMap((id) => this.#categoriesFacade.get(id)),
        tap((categories) => this.categories$.next(categories))
      )
      .subscribe();
  }

  #setProducts() {
    this.#route.params
      .pipe(
        map((params) => params['id']),
        switchMap((id) => this.#productsFacade.get(id)),
        tap((products) => this.products$.next(products))
      )
      .subscribe();
  }
}
