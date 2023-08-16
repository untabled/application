import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { MenusService } from '../../../../core';
import { MenusStore } from '../../../../store';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, catchError, map, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'untabled-menu-editor',
  templateUrl: './menu-editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuEditorComponent implements OnInit, OnDestroy {
  #menusService = inject(MenusService);
  #menusStore = inject(MenusStore);

  #route = inject(ActivatedRoute);
  #router = inject(Router);

  readonly activeMenu$ = this.#menusService.activeMenu$;

  readonly subscriptions = new Subscription();

  ngOnInit(): void {
    this.#setActiveMenu();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  #setActiveMenu() {
    this.subscriptions.add(
      this.#route.params
        .pipe(
          map((params) => params['menuId']),
          switchMap((id) => this.#menusStore.byId$(id)),
          catchError(() => {
            this.#router.navigateByUrl('/dashboard');
            return of();
          }),
          tap((menu) => this.#menusService.setActiveMenu(menu))
        )
        .subscribe()
    );
  }
}
