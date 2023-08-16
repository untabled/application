import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SidebarComponent,
  SidebarItem,
  ToolbarComponent,
} from '../../components';
import { RouterOutlet } from '@angular/router';

const DashboardConfig: SidebarItem[] = [
  {
    link: 'dashboard',
    label: 'Dashboard',
    icon: ['far', 'map'],
  },
  {
    link: 'profile',
    label: 'Profiel',
    icon: ['far', 'address-card'],
  },
];

@Component({
  selector: 'untabled-dashboard-layout',
  standalone: true,
  imports: [CommonModule, SidebarComponent, ToolbarComponent, RouterOutlet],
  templateUrl: './dashboard-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayoutComponent {
  readonly sidebarItems = DashboardConfig;
}
