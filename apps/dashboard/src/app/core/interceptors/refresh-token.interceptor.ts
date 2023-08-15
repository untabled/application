import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  #authService = inject(AuthService);

  #isRefreshing = false;

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          error.status === 401 &&
          !(
            request.url.includes('auth/signin') ||
            request.url.includes('auth/refresh')
          )
        ) {
          return this.#handle401Error(request, next);
        }
        console.log(request.url);

        return throwError(() => error);
      })
    );
  }

  #handle401Error(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    request: HttpRequest<any>,
    next: HttpHandler
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Observable<any> {
    if (!this.#isRefreshing) {
      this.#isRefreshing = true;

      return this.#authService.refresh().pipe(
        switchMap(() => {
          this.#isRefreshing = false;

          request = request.clone();

          return next.handle(request);
        }),
        catchError((error) => {
          this.#isRefreshing = false;

          return throwError(() => error);
        })
      );
    }

    return next.handle(request);
  }
}
