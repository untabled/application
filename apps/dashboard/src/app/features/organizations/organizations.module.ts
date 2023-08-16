import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationsRoutingModule } from './organizations-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MenuComponent } from './pages/menu/menu.component';
import {
  ButtonComponent,
  CardComponent,
  MenuItemComponent,
} from '@untabled/plumage';
import { MenuEditorComponent } from './components/menu-editor/menu-editor.component';
import { CardsComponent } from './pages/cards/cards.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';

@NgModule({
  declarations: [
    DashboardComponent,
    MenuComponent,
    MenuEditorComponent,
    CardsComponent,
    ProductsComponent,
    CategoriesComponent,
  ],
  imports: [
    CommonModule,
    OrganizationsRoutingModule,
    MenuItemComponent,
    CardComponent,
    ButtonComponent,
  ],
})
export class OrganizationsModule {}
