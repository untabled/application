import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent, ToolbarComponent } from '../../components';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'untabled-app-layout',
  standalone: true,
  imports: [CommonModule, SidebarComponent, ToolbarComponent, RouterModule],
  templateUrl: './app-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLayoutComponent {}
