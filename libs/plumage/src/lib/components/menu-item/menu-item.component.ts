import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../icon/icon.component';

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

  @Input({ required: true })
  link!: string;

  @Input()
  icon?: string;
}
