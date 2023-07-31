import { Injectable, inject } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Observable } from 'rxjs';
import { SignIn, SignUp } from '@untabled/types';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  #http = inject(HttpService);

  signup(payload: SignUp): Observable<boolean> {
    return this.#http.post<SignUp, boolean>('auth/signup', payload);
  }

  signin(payload: SignIn): Observable<boolean> {
    return this.#http.post<SignIn, boolean>('auth/signin', payload, {
      withCredentials: true,
    });
  }

  refresh(): Observable<void> {
    return this.#http.post<null>('auth/refresh', null, {
      withCredentials: true,
    });
  }
}
