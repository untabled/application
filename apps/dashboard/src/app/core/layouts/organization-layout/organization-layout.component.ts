import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SidebarComponent,
  SidebarItem,
  ToolbarComponent,
} from '../../components';
import { RouterOutlet } from '@angular/router';

const OrganizationConfig: SidebarItem[] = [
  {
    link: 'dashboard',
    label: 'Organisatie',
    icon: ['far', 'map'],
  },
  {
    link: 'menus',
    label: "Menu's",
    icon: ['far', 'lemon'],
  },
];

@Component({
  selector: 'untabled-organization-layout',
  standalone: true,
  imports: [CommonModule, ToolbarComponent, SidebarComponent, RouterOutlet],
  templateUrl: './organization-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationLayoutComponent {
  readonly sidebarItems = OrganizationConfig;
}
