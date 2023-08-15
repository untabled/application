import { Injectable, inject } from '@angular/core';
import { AuthFacade, UsersFacade } from '../facades';
import { UsersStore } from '../../store';
import { SignIn, SignUp } from '@untabled/types';
import { catchError, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #authFacade = inject(AuthFacade);
  #usersFacade = inject(UsersFacade);

  #usersStore = inject(UsersStore);

  #router = inject(Router);

  signin(payload: SignIn) {
    return this.#authFacade.signin(payload).pipe(
      switchMap(() => this.loadUser()),
      tap(() => this.#router.navigateByUrl('/dashboard'))
    );
  }

  signup(payload: SignUp) {
    return this.#authFacade
      .signup(payload)
      .pipe(tap(() => this.#router.navigateByUrl('/auth/signin')));
  }

  signout() {
    return this.#authFacade.signout().pipe(
      catchError(() => of(null)),
      tap(() => this.#usersStore.setUser(null)),
      tap(() => this.#router.navigateByUrl('/auth'))
    );
  }

  loadUser() {
    return this.#usersFacade
      .me()
      .pipe(tap((user) => this.#usersStore.setUser(user)));
  }

  refresh() {
    return this.#authFacade.refresh();
  }
}
