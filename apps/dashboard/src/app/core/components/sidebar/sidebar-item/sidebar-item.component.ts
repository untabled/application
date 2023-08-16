import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent, MenuItemComponent } from '@untabled/plumage';
import { SidebarItem } from '../sidebar.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'untabled-sidebar-item',
  standalone: true,
  imports: [CommonModule, MenuItemComponent, IconComponent],
  templateUrl: './sidebar-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarItemComponent {
  @Input()
  item?: SidebarItem;

  #expanded = false;

  get expanded() {
    return this.#expanded;
  }

  toggle() {
    this.#expanded = !this.#expanded;
  }

  #route = inject(ActivatedRoute);

  constructor() {
    this.#route.url.subscribe(console.log);
  }
}
