import { Injectable } from '@angular/core';
import { Organization } from '@untabled/types';
import { EntityStore } from './entity.store';

@Injectable({
  providedIn: 'root',
})
export class OrganizationsStore extends EntityStore<Organization> {}
