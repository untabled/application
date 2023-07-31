import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'untabled-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninComponent {}
