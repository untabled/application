import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'untabled-icon',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  @Input()
  name = 'feather';

  @Input()
  size = '16';

  @HostBinding('class')
  get classes() {
    return 'flex mt-0.5';
  }
}
