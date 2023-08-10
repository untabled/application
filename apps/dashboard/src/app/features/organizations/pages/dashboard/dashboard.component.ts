import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { OrganizationsService } from '../../../../core';

@Component({
  selector: 'untabled-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  #organizationsService = inject(OrganizationsService);

  readonly activeOrganization$ = this.#organizationsService.activeOrganization$;
}
