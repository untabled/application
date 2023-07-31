import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services';
import { UsersStore } from '../../store';
import { catchError, map, of, switchMap, tap } from 'rxjs';

export const notAuthenticatedGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const usersStore = inject(UsersStore);

  const router = inject(Router);

  return usersStore.user$.pipe(
    switchMap((user) =>
      user ? of(user) : authService.loadUser().pipe(catchError(() => of(false)))
    ),
    map((user) => !!user),
    tap((authenticated) => authenticated && router.navigateByUrl('/dashboard')),
    map((authenticated) => !authenticated)
  );
};
