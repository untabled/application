import { Injectable, inject } from '@angular/core';
import { MenusFacade } from '../facades';
import { MenusStore } from '../../store';
import { BehaviorSubject, tap } from 'rxjs';
import { Menu } from '@untabled/types';

@Injectable({
  providedIn: 'root',
})
export class MenusService {
  #menusFacade = inject(MenusFacade);
  #menusStore = inject(MenusStore);

  #activeMenu: Menu | null = null;
  #activeMenu$ = new BehaviorSubject<Menu | null>(null);

  get activeMenu() {
    return this.#activeMenu;
  }

  get activeMenu$() {
    return this.#activeMenu$.asObservable();
  }

  fetchMenus(organizationId: string) {
    return this.#menusFacade
      .get(organizationId)
      .pipe(tap((menus) => this.#menusStore.set(menus)));
  }

  setActiveMenu(menu: Menu | null) {
    this.#activeMenu = menu;
    this.#activeMenu$.next(menu);
  }
}
