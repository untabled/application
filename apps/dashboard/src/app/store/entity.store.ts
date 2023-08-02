import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EntityStore<Entity extends { id: string }> {
  #entities: Entity[] | null = null;
  #entities$ = new BehaviorSubject<Entity[] | null>(null);

  get entities() {
    return this.#entities;
  }

  get entities$() {
    return this.#entities$.asObservable();
  }

  byId$ = (id: string) =>
    this.entities$.pipe(
      map((entities) => entities?.find((entity) => entity.id === id))
    );

  set(entities: Entity[]) {
    this.#entities = entities;
    this.#entities$.next(entities);
  }

  add(entities: Entity) {
    if (!this.#entities) return;

    const updatedEntities = [...this.#entities, entities];

    this.#entities = updatedEntities;
    this.#entities$.next(updatedEntities);
  }

  update(updatedEntity: Entity) {
    if (!this.#entities) return;

    const updatedEntities = this.#entities.map((entity) =>
      entity.id === updatedEntity.id ? updatedEntity : entity
    );

    this.#entities = updatedEntities;
    this.#entities$.next(updatedEntities);
  }

  delete(id: string) {
    if (!this.#entities) return;

    const updatedEntity = this.#entities.filter((entity) => entity.id !== id);

    this.#entities = updatedEntity;
    this.#entities$.next(updatedEntity);
  }
}
