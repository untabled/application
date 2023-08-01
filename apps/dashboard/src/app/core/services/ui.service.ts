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

  toggleSidebar() {
    this.#sidebarOpen = !this.#sidebarOpen;
    this.#sidebarOpen$.next(this.#sidebarOpen);
  }
}
