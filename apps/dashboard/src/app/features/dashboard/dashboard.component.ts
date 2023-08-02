import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { OrganizationsFacade } from '../../core';
import { OrganizationsStore } from '../../store';

@Component({
  selector: 'untabled-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  #organizationsFacade = inject(OrganizationsFacade);
  #organizationsStore = inject(OrganizationsStore);

  organizations$ = this.#organizationsStore.entities$;

  ngOnInit(): void {
    this.#organizationsFacade
      .get()
      .subscribe((orgs) => this.#organizationsStore.set(orgs));
  }
}
