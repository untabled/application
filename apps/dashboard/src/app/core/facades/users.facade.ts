import { Injectable, inject } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Observable } from 'rxjs';
import { User } from '@untabled/types';

@Injectable({
  providedIn: 'root',
})
export class UsersFacade {
  #http = inject(HttpService);

  me(): Observable<User> {
    return this.#http.get<User>('users/me', { withCredentials: true });
  }
}
