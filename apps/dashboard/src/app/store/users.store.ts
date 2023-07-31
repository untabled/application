import { Injectable } from '@angular/core';
import { User } from '@untabled/types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersStore {
  #user: User | null = null;
  #user$ = new BehaviorSubject<User | null>(null);

  get user() {
    return this.#user;
  }

  get user$() {
    return this.#user$.asObservable();
  }

  setUser(user: User | null) {
    this.#user = user;
    this.#user$.next(user);
  }
}
