import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationsFacade, OrganizationsService } from '../../core';
import { catchError, map, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'untabled-organizations',
  templateUrl: './organizations.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationsComponent implements OnInit {
  #route = inject(ActivatedRoute);
  #router = inject(Router);

  #organizationsFacade = inject(OrganizationsFacade);
  #organizationsService = inject(OrganizationsService);

  ngOnInit(): void {
    this.#setActiveOrganization();
  }

  #setActiveOrganization() {
    this.#route.params
      .pipe(
        map((params) => params['id']),
        switchMap((id) => this.#organizationsFacade.getById(id)),
        catchError(() => {
          this.#router.navigateByUrl('/dashboard');
          return of();
        }),
        tap((organization) =>
          this.#organizationsService.setActiveOrganization(organization)
        )
      )
      .subscribe();
  }
}
