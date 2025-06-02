import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { EntrenadorSidebarComponent } from '../entrenador-sidebar/entrenador-sidebar.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-entrenador-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, EntrenadorSidebarComponent, TranslateModule],
  templateUrl: './entrenador-layout.component.html',
  styleUrls: ['./entrenador-layout.component.css'],
})
export class EntrenadorLayoutComponent {}
