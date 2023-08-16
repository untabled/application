import { Injectable, inject } from '@angular/core';
import { CreateMenu, Menu, UpdateMenu } from '@untabled/types';
import { Observable } from 'rxjs';
import { HttpService } from '../services/http.service';

@Injectable({
  providedIn: 'root',
})
export class MenusFacade {
  #http = inject(HttpService);

  post(payload: CreateMenu, organizationId: string): Observable<Menu> {
    return this.#http.post<CreateMenu, Menu>(
      `organizations/${organizationId}/menus`,
      payload,
      { withCredentials: true }
    );
  }

  patch(
    id: string,
    payload: CreateMenu,
    organizationId: string
  ): Observable<Menu> {
    return this.#http.patch<UpdateMenu, Menu>(
      `organizations/${organizationId}/menus/${id}`,
      payload,
      { withCredentials: true }
    );
  }

  get(organizationId: string): Observable<Menu[]> {
    return this.#http.get<Menu[]>(`organizations/${organizationId}/menus`, {
      withCredentials: true,
    });
  }

  getById(id: string, organizationId: string): Observable<Menu> {
    return this.#http.get<Menu>(`organizations/${organizationId}/menus/${id}`, {
      withCredentials: true,
    });
  }

  delete(id: string, organizationId: string): Observable<boolean> {
    return this.#http.delete<boolean>(
      `organizations/${organizationId}/menus/${id}`,
      {
        withCredentials: true,
      }
    );
  }

  listProducts(
    id: string,
    organizationId: string
  ): Observable<{ productId: string }[]> {
    return this.#http.get<{ productId: string }[]>(
      `organizations/${organizationId}/menus/${id}/products`,
      { withCredentials: true }
    );
  }

  addProduct(
    id: string,
    organizationId: string,
    productId: string
  ): Observable<{ productId: string }> {
    return this.#http.post<null, { productId: string }>(
      `organizations/${organizationId}/menus/${id}/products/${productId}`,
      null,
      { withCredentials: true }
    );
  }

  removeProduct(
    id: string,
    organizationId: string,
    productId: string
  ): Observable<boolean> {
    return this.#http.delete<boolean>(
      `organizations/${organizationId}/menus/${id}/products/${productId}`,
      { withCredentials: true }
    );
  }

  listCategories(
    id: string,
    organizationId: string
  ): Observable<{ categoryId: string }[]> {
    return this.#http.get<{ categoryId: string }[]>(
      `organizations/${organizationId}/menus/${id}/categories`,
      { withCredentials: true }
    );
  }

  addCategory(
    id: string,
    organizationId: string,
    categoryId: string
  ): Observable<{ categoryId: string }> {
    return this.#http.post<null, { categoryId: string }>(
      `organizations/${organizationId}/menus/${id}/categories/${categoryId}`,
      null,
      { withCredentials: true }
    );
  }

  removeCategory(
    id: string,
    organizationId: string,
    categoryId: string
  ): Observable<boolean> {
    return this.#http.delete<boolean>(
      `organizations/${organizationId}/menus/${id}/categories/${categoryId}`,
      { withCredentials: true }
    );
  }
}
