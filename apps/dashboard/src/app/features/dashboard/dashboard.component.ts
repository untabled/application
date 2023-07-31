import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'untabled-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {}
