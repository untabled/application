import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'untabled-input-description',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-description.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDescriptionComponent {
  @Input({ required: true })
  description!: string;
}
