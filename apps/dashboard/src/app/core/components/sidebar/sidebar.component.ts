import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent, MenuItemComponent } from '@untabled/plumage';
import { UiService } from '../../services';
import { animate, style, transition, trigger } from '@angular/animations';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter, tap } from 'rxjs';

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
export class SidebarComponent implements OnInit, OnDestroy {
  #uiService = inject(UiService);
  #router = inject(Router);

  sidebarOpen$ = this.#uiService.sidebarOpen$;

  readonly #subscriptions = new Subscription();

  @HostBinding('class.hidden')
  get sidebarClosed() {
    return !this.#uiService.sidebarOpen;
  }

  @HostBinding('class')
  get classes() {
    return 'fixed right-0 bottom-0 top-0 left-0 bg-neutral-100/50 shadow-md flex items-center justify-left';
  }

  ngOnInit(): void {
    this.#onRouteChanges();
  }

  ngOnDestroy(): void {
    this.#subscriptions.unsubscribe();
  }

  @HostListener('click')
  onClick() {
    console.log('click');
    this.closeSidebar();
  }

  closeSidebar() {
    this.#uiService.closeSidebar();
  }

  #onRouteChanges() {
    this.#subscriptions.add(
      this.#router.events
        .pipe(
          filter((e) => e instanceof NavigationEnd),
          tap(() => this.closeSidebar())
        )
        .subscribe()
    );
  }
}
