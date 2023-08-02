import { Injectable, inject } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Observable } from 'rxjs';
import {
  CreateOrganization,
  Organization,
  UpdateOrganization,
} from '@untabled/types';

@Injectable({
  providedIn: 'root',
})
export class OrganizationsFacade {
  #http = inject(HttpService);

  post(payload: CreateOrganization): Observable<Organization> {
    return this.#http.post('organizations', payload, { withCredentials: true });
  }

  patch(id: string, payload: UpdateOrganization): Observable<Organization> {
    return this.#http.patch(`organizations/${id}`, payload, {
      withCredentials: true,
    });
  }

  get(): Observable<Organization[]> {
    return this.#http.get<Organization[]>('organizations', {
      withCredentials: true,
    });
  }

  getById(id: string): Observable<Organization> {
    return this.#http.get<Organization>(`organizations/${id}`, {
      withCredentials: true,
    });
  }
}
