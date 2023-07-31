import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsersStore } from '../../store';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../services';

export const authenticatedGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const usersStore = inject(UsersStore);

  const router = inject(Router);

  return usersStore.user$.pipe(
    switchMap((user) =>
      user ? of(user) : authService.loadUser().pipe(catchError(() => of(false)))
    ),
    map((user) => !!user),
    tap((authenticated) => !authenticated && router.navigateByUrl('/auth'))
  );
};
