import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../icon/icon.component';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'untabled-menu-item',
  standalone: true,
  imports: [CommonModule, IconComponent, RouterModule],
  templateUrl: './menu-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemComponent {
  @Input({ required: true })
  label!: string;

  @Input()
  link?: string;

  @Input()
  icon?: IconProp;

  @Input()
  prefix?: string;

  @Output()
  clicked = new EventEmitter<void>();
}
