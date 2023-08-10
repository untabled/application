import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'untabled-text-label',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './text-label.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextLabelComponent {
  @Input()
  icon?: IconProp;

  @Input()
  loading?: boolean | null = false;

  @HostBinding('class')
  get classes() {
    return 'inline-flex items-center gap-2';
  }
}
