import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationsRoutingModule } from './organizations-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MenuComponent } from './pages/menu/menu.component';
import { MenuItemComponent } from '@untabled/plumage';
import { MenuEditorComponent } from './components/menu-editor/menu-editor.component';

@NgModule({
  declarations: [DashboardComponent, MenuComponent, MenuEditorComponent],
  imports: [CommonModule, OrganizationsRoutingModule, MenuItemComponent],
})
export class OrganizationsModule {}
