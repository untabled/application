import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MenuComponent } from './pages/menu/menu.component';
import { activeOrganizationResolver } from '../../core';
import { MenuEditorComponent } from './components/menu-editor/menu-editor.component';

const routes: Routes = [
  {
    path: '',
    resolve: { activeOrganization: activeOrganizationResolver },
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'menus',
        component: MenuComponent,
        children: [
          {
            path: ':menuId',
            component: MenuEditorComponent,
          },
        ],
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationsRoutingModule {}
