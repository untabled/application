import { Injectable, inject } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Category, CreateCategory, UpdateCategory } from '@untabled/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesFacade {
  #http = inject(HttpService);

  post(payload: CreateCategory, organizationId: string): Observable<Category> {
    return this.#http.post<CreateCategory, Category>(
      `organizations/${organizationId}/categories`,
      payload,
      {
        withCredentials: true,
      }
    );
  }

  patch(
    id: string,
    payload: UpdateCategory,
    organizationId: string
  ): Observable<Category> {
    return this.#http.patch<UpdateCategory, Category>(
      `organizations/${organizationId}/categories/${id}`,
      payload,
      {
        withCredentials: true,
      }
    );
  }

  get(organizationId: string): Observable<Category[]> {
    return this.#http.get<Category[]>(
      `organizations/${organizationId}/categories`,
      {
        withCredentials: true,
      }
    );
  }

  getById(id: string, organizationId: string): Observable<Category> {
    return this.#http.get<Category>(
      `organizations/${organizationId}/categories/${id}`,
      {
        withCredentials: true,
      }
    );
  }
}
