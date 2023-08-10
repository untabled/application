import { Injectable } from '@angular/core';
import { Organization } from '@untabled/types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrganizationsService {
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
}
