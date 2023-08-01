import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, UiService } from '../../services';
import { provideIcons } from '@ng-icons/core';
import { ionMenu, ionExitOutline } from '@ng-icons/ionicons';
import { IconComponent } from '@untabled/plumage';

@Component({
  selector: 'untabled-toolbar',
  standalone: true,
  imports: [CommonModule, IconComponent],
  providers: [provideIcons({ ionMenu, ionExitOutline })],
  templateUrl: './toolbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  #uiService = inject(UiService);
  #authService = inject(AuthService);

  @HostBinding('class')
  get classes() {
    return 'w-full border-b border-neutral-50 block h-16 flex items-center justify-between px-8';
  }

  toggleSidebar() {
    this.#uiService.toggleSidebar();
  }

  signout() {
    this.#authService.signout().subscribe();
  }
}
