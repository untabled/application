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
    label: "Menu's",
    icon: ['far', 'lemon'],
    prefix: 'menus',
    children: [
      {
        link: 'cards',
        label: 'Menukaarten',
        icon: ['far', 'map'],
      },
      {
        link: 'products',
        label: 'Producten',
        icon: ['far', 'lemon'],
      },
      {
        link: 'categories',
        label: 'Categorieën',
        icon: ['far', 'map'],
      },
    ],
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
