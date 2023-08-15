import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Organization } from '@untabled/types';

@Component({
  selector: 'untabled-organization-card',
  templateUrl: './organization-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationCardComponent {
  @Input()
  organization!: Organization;
}
