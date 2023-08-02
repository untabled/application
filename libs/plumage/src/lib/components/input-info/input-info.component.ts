import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'untabled-input-info',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './input-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputInfoComponent {
  @Input({ required: true })
  info!: string;

  @HostBinding('class')
  get classes() {
    return 'flex gap-1.5 text-xs text-neutral-600';
  }
}
