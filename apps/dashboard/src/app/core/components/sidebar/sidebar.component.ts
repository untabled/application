import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '@untabled/plumage';
import { UiService } from '../../services';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter, tap } from 'rxjs';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { SidebarItemComponent } from './sidebar-item/sidebar-item.component';

export interface SidebarItem {
  link?: string;
  label: string;
  icon: IconProp;
  prefix?: string;
  children?: SidebarItem[];
}

@Component({
  selector: 'untabled-sidebar',
  standalone: true,
  imports: [CommonModule, IconComponent, SidebarItemComponent],
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit, OnDestroy {
  #uiService = inject(UiService);
  #router = inject(Router);

  @Input()
  items?: SidebarItem[];

  readonly #subscriptions = new Subscription();

  @HostBinding('class.hidden')
  get sidebarClosed() {
    return !this.#uiService.sidebarOpen;
  }

  @HostBinding('class')
  get classes() {
    return 'fixed w-full lg:bg-transparent bg-neutral-100/50 backdrop-blur-sm lg:w-[16rem] lg:block h-screen';
  }

  ngOnInit(): void {
    this.#onRouteChanges();
  }

  ngOnDestroy(): void {
    this.#subscriptions.unsubscribe();
  }

  @HostListener('click')
  onClick() {
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
