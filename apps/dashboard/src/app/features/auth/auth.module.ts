import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ButtonComponent, TextInputComponent } from '@untabled/plumage';
import { AuthLayoutComponent } from '../../core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SigninComponent, SignupComponent],
  imports: [
    AuthLayoutComponent,
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    TextInputComponent,
    ButtonComponent,
    RouterModule,
  ],
})
export class AuthModule {}
