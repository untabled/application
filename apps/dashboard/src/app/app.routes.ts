import { Route } from '@angular/router';
import {
  AppLayoutComponent,
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
    component: AppLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'organization/:id',
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
