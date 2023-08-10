import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationsRoutingModule } from './organizations-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrganizationsComponent } from './organizations.component';

@NgModule({
  declarations: [OrganizationsComponent, DashboardComponent],
  imports: [CommonModule, OrganizationsRoutingModule],
})
export class OrganizationsModule {}
