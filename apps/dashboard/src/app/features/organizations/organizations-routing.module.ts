import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MenuComponent } from './pages/menu/menu.component';
import { activeOrganizationResolver } from '../../core';
import { MenuEditorComponent } from './components/menu-editor/menu-editor.component';
import { CardsComponent } from './pages/cards/cards.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';

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
            path: 'cards',
            component: CardsComponent,
          },
          {
            path: 'cards/:menuId',
            component: MenuEditorComponent,
          },
          {
            path: 'products',
            component: ProductsComponent,
          },
          {
            path: 'products/:productId',
            component: MenuEditorComponent,
          },
          {
            path: 'categories',
            component: CategoriesComponent,
          },
          {
            path: 'categories/:categoryId',
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
