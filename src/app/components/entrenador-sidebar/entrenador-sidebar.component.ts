// entrenador-sidebar.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-entrenador-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatListModule, MatIconModule, TranslateModule],
  templateUrl: './entrenador-sidebar.component.html',
  styleUrls: ['./entrenador-sidebar.component.css'],
})
export class EntrenadorSidebarComponent {}
