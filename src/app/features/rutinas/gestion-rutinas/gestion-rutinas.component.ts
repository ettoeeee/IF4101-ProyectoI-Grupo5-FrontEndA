import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestion-rutinas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-rutinas.component.html',
  styleUrls: ['./gestion-rutinas.component.css']
})
export class GestionRutinasComponent {
  filtro: string = '';

  constructor(private router: Router) {}

irACrearRutina(): void {
  this.router.navigate(['/rutinas/nueva']);
}


}
