import { Injectable } from '@angular/core';
import { EntityStore } from './entity.store';
import { Menu } from '@untabled/types';

@Injectable({
  providedIn: 'root',
})
export class MenusStore extends EntityStore<Menu> {}
