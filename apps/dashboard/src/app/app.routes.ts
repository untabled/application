import { Route } from '@angular/router';
import {
  DashboardLayoutComponent,
  OrganizationLayoutComponent,
  authenticatedGuard,
  notAuthenticatedGuard,
} from './core';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: 'auth',
    canActivate: [notAuthenticatedGuard],
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    canActivate: [authenticatedGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardLayoutComponent,
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: ':id',
        component: OrganizationLayoutComponent,
        loadChildren: () =>
          import('./features/organizations/organizations.module').then(
            (m) => m.OrganizationsModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
