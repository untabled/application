import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {
  ButtonComponent,
  CardComponent,
  IconComponent,
} from '@untabled/plumage';
import { OrganizationCardComponent } from './components/organization-card/organization-card.component';

@NgModule({
  declarations: [DashboardComponent, OrganizationCardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CardComponent,
    ButtonComponent,
    IconComponent,
  ],
})
export class DashboardModule {}
