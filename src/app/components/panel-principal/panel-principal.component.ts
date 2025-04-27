import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-panel-principal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './panel-principal.component.html',
  styleUrls: ['./panel-principal.component.css']
})
export class PanelPrincipalComponent {
  cantidadClientes = 156;
  nuevosClientesMes = 12;

  cantidadEmpleados = 24;
  cantidadEntrenadores = 3;
  cantidadStaff = 21;

  cantidadEjercicios = 87;
  cantidadCategorias = 8;

  cantidadRutinasActivas = 132;
  rutinasSemana = 18;

  actividadesRecientes = [
    { descripcion: 'Juan Pérez creó una nueva rutina para María García', fecha: new Date() },
    { descripcion: 'Admin registró un nuevo cliente: Roberto Sánchez', fecha: new Date(new Date().setHours(new Date().getHours() - 5)) },
    { descripcion: 'Admin agregó ejercicios a Piernas', fecha: new Date(new Date().setDate(new Date().getDate() - 1)) },
    { descripcion: 'Admin actualizó info de Pedro Martínez', fecha: new Date(new Date().setDate(new Date().getDate() - 2)) }
  ];
}
