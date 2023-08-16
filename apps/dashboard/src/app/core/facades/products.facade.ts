import { Injectable, inject } from '@angular/core';
import { HttpService } from '../services/http.service';
import { CreateProduct, Product, UpdateProduct } from '@untabled/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsFacade {
  #http = inject(HttpService);

  post(payload: CreateProduct, organizationId: string): Observable<Product> {
    return this.#http.post<CreateProduct, Product>(
      `organizations/${organizationId}/products`,
      payload,
      {
        withCredentials: true,
      }
    );
  }

  patch(
    id: string,
    payload: UpdateProduct,
    organizationId: string
  ): Observable<Product> {
    return this.#http.patch<UpdateProduct, Product>(
      `organizations/${organizationId}/products/${id}`,
      payload,
      {
        withCredentials: true,
      }
    );
  }

  get(organizationId: string): Observable<Product[]> {
    return this.#http.get<Product[]>(
      `organizations/${organizationId}/products`,
      {
        withCredentials: true,
      }
    );
  }

  getById(id: string, organizationId: string): Observable<Product> {
    return this.#http.get<Product>(
      `organizations/${organizationId}/products/${id}`,
      {
        withCredentials: true,
      }
    );
  }

  delete(id: string, organizationId: string): Observable<boolean> {
    return this.#http.delete<boolean>(
      `organizations/${organizationId}/products/${id}`,
      {
        withCredentials: true,
      }
    );
  }
}
