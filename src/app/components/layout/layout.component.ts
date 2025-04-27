import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  constructor(private router: Router) {}

  navegar(ruta: string) {
    this.router.navigate([ruta]);
  }

    // 🔥 Saber si una ruta está activa
    esRutaActiva(ruta: string): boolean {
      return this.router.url.startsWith(ruta);
    }
}
