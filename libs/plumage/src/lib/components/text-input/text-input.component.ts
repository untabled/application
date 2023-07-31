import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputDescriptionComponent } from '../input-description/input-description.component';
import { InputInfoComponent } from '../input-info/input-info.component';
import { InputLabelComponent } from '../input-label/input-label.component';

type TextInputType = 'text' | 'email' | 'password';

@Component({
  selector: 'untabled-text-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputDescriptionComponent,
    InputInfoComponent,
    InputLabelComponent,
  ],
  templateUrl: './text-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputComponent {
  @Input({ required: true })
  control!: FormControl<string>;

  @Input()
  label?: string;

  @Input()
  description?: string;

  @Input()
  info?: string;

  @Input()
  required = false;

  @Input()
  type: TextInputType = 'text';

  @HostBinding('class')
  get classes() {
    return 'flex flex-col gap-2.5';
  }
}
