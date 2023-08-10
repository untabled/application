import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../../../core';
import { BehaviorSubject, tap } from 'rxjs';

@Component({
  selector: 'untabled-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninComponent {
  #authService = inject(AuthService);

  readonly loading$ = new BehaviorSubject(false);

  form = new FormGroup({
    email: new FormControl<string>('', { nonNullable: true }),
    password: new FormControl<string>('', { nonNullable: true }),
  });

  submit() {
    this.loading$.next(true);
    this.#authService
      .signin(this.form.getRawValue())
      .pipe(tap(() => this.loading$.next(false)))
      .subscribe();
  }
}
