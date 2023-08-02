import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent, MenuItemComponent } from '@untabled/plumage';
import { UiService } from '../../services';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'untabled-sidebar',
  standalone: true,
  imports: [CommonModule, MenuItemComponent, IconComponent],
  animations: [
    trigger('enter', [
      transition(':enter', [
        style({
          transform: 'translateX(-100%)',
        }),
        animate(150),
      ]),
    ]),
  ],
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  #uiService = inject(UiService);

  sidebarOpen$ = this.#uiService.sidebarOpen$;

  @HostBinding('class.hidden')
  get sidebarClosed() {
    return !this.#uiService.sidebarOpen;
  }

  @HostBinding('class')
  get classes() {
    return 'fixed right-0 bottom-0 top-0 left-0 bg-neutral-50/50 shadow-md flex items-center justify-left';
  }

  @HostListener('click')
  onClick() {
    this.toggleSidebar();
  }

  toggleSidebar() {
    this.#uiService.toggleSidebar();
  }
}
