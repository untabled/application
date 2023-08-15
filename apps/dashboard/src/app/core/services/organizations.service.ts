import { Injectable, inject } from '@angular/core';
import { Organization } from '@untabled/types';
import { BehaviorSubject, tap } from 'rxjs';
import { OrganizationsFacade } from '../facades';
import { OrganizationsStore } from '../../store';

@Injectable({
  providedIn: 'root',
})
export class OrganizationsService {
  #organizationsFacade = inject(OrganizationsFacade);
  #organizationsStore = inject(OrganizationsStore);

  #activeOrganization: Organization | null = null;
  #activeOrganization$ = new BehaviorSubject<Organization | null>(null);

  get activeOrganization() {
    return this.#activeOrganization;
  }

  get activeOrganization$() {
    return this.#activeOrganization$.asObservable();
  }

  setActiveOrganization(organization: Organization | null) {
    this.#activeOrganization = organization;
    this.#activeOrganization$.next(organization);
  }

  fetchOrganizations() {
    return this.#organizationsFacade
      .get()
      .pipe(tap((orgs) => this.#organizationsStore.set(orgs)));
  }
}
