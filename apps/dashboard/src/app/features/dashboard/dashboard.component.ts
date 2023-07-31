import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UsersStore } from '../../store';
import { AuthService } from '../../core';

@Component({
  selector: 'untabled-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  user$ = inject(UsersStore).user$;

  #authService = inject(AuthService);

  signout() {
    this.#authService.signout().subscribe();
  }
}
