import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { provideIcons } from '@ng-icons/core';
import { ionInformationCircleOutline } from '@ng-icons/ionicons';

@Component({
  selector: 'untabled-input-info',
  standalone: true,
  imports: [CommonModule, IconComponent],
  providers: [provideIcons({ ionInformationCircleOutline })],
  templateUrl: './input-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputInfoComponent {
  @Input({ required: true })
  info!: string;

  @HostBinding('class')
  get classes() {
    return 'flex gap-1.5';
  }
}
