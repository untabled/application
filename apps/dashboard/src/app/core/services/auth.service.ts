import { Injectable, inject } from '@angular/core';
import { AuthFacade, UsersFacade } from '../facades';
import { UsersStore } from '../../store';
import { SignIn } from '@untabled/types';
import { switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #authFacade = inject(AuthFacade);
  #usersFacade = inject(UsersFacade);

  #usersStore = inject(UsersStore);

  signin(payload: SignIn) {
    return this.#authFacade.signin(payload).pipe(
      switchMap(() => this.#usersFacade.me()),
      tap((user) => this.#usersStore.setUser(user))
    );
  }

  loadUser() {
    return this.#usersFacade
      .me()
      .pipe(tap((user) => this.#usersStore.setUser(user)));
  }
}
