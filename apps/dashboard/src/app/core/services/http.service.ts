import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface HttpOptions {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  withCredentials?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  #http = inject(HttpClient);

  #baseUrl: string;

  constructor() {
    this.#baseUrl = environment.apiUrl;
  }

  post<Payload, Response = void>(
    url: string,
    payload: Payload,
    options?: HttpOptions
  ): Observable<Response> {
    return this.#http.post<Response>(
      `${this.#baseUrl}/${url}`,
      payload,
      options
    );
  }

  get<Response>(url: string, options?: HttpOptions): Observable<Response> {
    return this.#http.get<Response>(`${this.#baseUrl}/${url}`, options);
  }

  put<Payload, Response = void>(
    url: string,
    payload: Payload,
    options?: HttpOptions
  ): Observable<Response> {
    return this.#http.put<Response>(
      `${this.#baseUrl}/${url}`,
      payload,
      options
    );
  }

  patch<Payload, Response = void>(
    url: string,
    payload: Payload,
    options?: HttpOptions
  ): Observable<Response> {
    return this.#http.patch<Response>(
      `${this.#baseUrl}/${url}`,
      payload,
      options
    );
  }

  delete<Response = void>(
    url: string,
    options?: HttpOptions
  ): Observable<Response> {
    return this.#http.delete<Response>(`${this.#baseUrl}/${url}`, options);
  }
}
