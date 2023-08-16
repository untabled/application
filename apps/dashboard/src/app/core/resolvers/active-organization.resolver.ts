import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { OrganizationsService } from '../services';
import { OrganizationsFacade } from '../facades';
import { Observable, catchError, of, tap } from 'rxjs';
import { Organization } from '@untabled/types';

export const activeOrganizationResolver: ResolveFn<Observable<Organization>> = (
  route
) => {
  const organizationsService = inject(OrganizationsService);
  const organizationsFacade = inject(OrganizationsFacade);
  const router = inject(Router);

  return organizationsFacade.getById(route.params['id']).pipe(
    catchError(() => {
      router.navigateByUrl('/dashboard');
      return of();
    }),
    tap((organization) =>
      organizationsService.setActiveOrganization(organization)
    )
  );
};
