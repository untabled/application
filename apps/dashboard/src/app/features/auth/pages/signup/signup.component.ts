import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../../../core';
import { BehaviorSubject, tap } from 'rxjs';

@Component({
  selector: 'untabled-signup',
  templateUrl: './signup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  #authService = inject(AuthService);

  readonly loading$ = new BehaviorSubject(false);

  form = new FormGroup({
    email: new FormControl<string>('', { nonNullable: true }),
    firstName: new FormControl<string>('', { nonNullable: true }),
    lastName: new FormControl<string>('', { nonNullable: true }),
    password: new FormControl<string>('', { nonNullable: true }),
  });

  submit() {
    this.loading$.next(true);
    this.#authService
      .signup(this.form.getRawValue())
      .pipe(tap(() => this.loading$.next(false)))
      .subscribe();
  }
}
