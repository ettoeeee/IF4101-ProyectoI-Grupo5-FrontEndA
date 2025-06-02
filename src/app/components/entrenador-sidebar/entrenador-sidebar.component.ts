// entrenador-sidebar.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-entrenador-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatListModule, MatIconModule],
  templateUrl: './entrenador-sidebar.component.html',
  styleUrls: ['./entrenador-sidebar.component.css'],
})
export class EntrenadorSidebarComponent {}
