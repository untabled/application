import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  #sidebarOpen = false;
  #sidebarOpen$ = new BehaviorSubject<boolean>(false);

  get sidebarOpen() {
    return this.#sidebarOpen;
  }

  get sidebarOpen$() {
    return this.#sidebarOpen$.asObservable();
  }

  openSidebar() {
    this.#sidebarOpen = true;
    this.#sidebarOpen$.next(true);
  }

  closeSidebar() {
    this.#sidebarOpen = false;
    this.#sidebarOpen$.next(false);
  }
}
