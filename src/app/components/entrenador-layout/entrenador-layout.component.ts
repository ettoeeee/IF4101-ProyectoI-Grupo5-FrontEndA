import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { EntrenadorSidebarComponent } from '../entrenador-sidebar/entrenador-sidebar.component';

@Component({
  selector: 'app-entrenador-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, EntrenadorSidebarComponent],
  templateUrl: './entrenador-layout.component.html',
  styleUrls: ['./entrenador-layout.component.css'],
})
export class EntrenadorLayoutComponent {}
