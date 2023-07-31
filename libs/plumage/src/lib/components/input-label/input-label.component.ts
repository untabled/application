import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'untabled-input-label',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-label.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputLabelComponent {
  @Input({ required: true })
  label!: string;

  @Input()
  required = false;
}
