import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { TextLabelComponent } from '../text-label/text-label.component';

type ButtonVariants =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'success'
  | 'warning'
  | 'outlined';

@Component({
  selector: 'untabled-button, button[untabledButton]',
  standalone: true,
  imports: [CommonModule, TextLabelComponent],
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input()
  untabledButton?: ButtonVariants = 'primary';

  @Input()
  icon?: IconProp;

  @Input()
  loading?: boolean | null = false;

  @HostBinding('class')
  get classes() {
    return `
      block w-full appearance-none rounded-md border-0 px-3 py-2 text-sm font-medium outline-none 
      ${this.untabledButton === 'primary' && 'text-neutral-900 bg-primary-300'} 
      ${this.untabledButton === 'secondary' && 'text-white bg-primary-900'}
      ${this.untabledButton === 'error' && 'text-error-900 bg-error-50'}
      ${this.untabledButton === 'success' && 'text-success-900 bg-success-50'}
      ${this.untabledButton === 'warning' && 'text-warning-900 bg-warning-50'}
      ${
        this.untabledButton === 'outlined' &&
        'outline-none ring-1 ring-neutral-900/10 shadow'
      }
      ${this.loading && 'cursor-not-allowed'}
    `;
  }
}
