import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { OrganizationsService } from '../../core';
import { OrganizationsStore } from '../../store';

@Component({
  selector: 'untabled-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  #organizationsService = inject(OrganizationsService);
  #organizationsStore = inject(OrganizationsStore);

  organizations$ = this.#organizationsStore.entities$;

  ngOnInit(): void {
    this.#organizationsService.fetchOrganizations().subscribe();
  }
}
