import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'untabled-auth',
  templateUrl: './auth.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {}
