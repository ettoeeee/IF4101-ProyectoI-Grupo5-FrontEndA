import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PanelPrincipalService } from '../../services/panel-principal/panel-principal.service';  // 🔥 Importa el servicio
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-panel-principal',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './panel-principal.component.html',
  styleUrls: ['./panel-principal.component.css']
})
export class PanelPrincipalComponent implements OnInit {
  
  cantidadClientes = 0;      // 🔥 Inicializado en 0 para que cargue después
  nuevosClientesMes = 0;     // 🔥 (opcional, puedes ponerlo luego real)
  
  cantidadEmpleados = 24;
  cantidadEntrenadores = 3;
  cantidadStaff = 21;

  cantidadEjercicios = 87;
  cantidadCategorias = 8;

  cantidadRutinasActivas = 132;
  rutinasSemana = 18;

  actividadesRecientes: { descripcion: string, fecha: Date }[] = [];

  constructor(private panelService: PanelPrincipalService) {}

  ngOnInit(): void {
    this.cargarEstadisticas();
  }

  cargarEstadisticas() {
    this.panelService.obtenerCantidadClientes().subscribe({
      next: (respuesta) => {
        this.cantidadClientes = respuesta.cantidadClientes;
      },
      error: (err) => {
        console.error('Error cargando cantidad de clientes:', err);
      }
    });

    this.panelService.obtenerClientesRecientes().subscribe({
      next: (clientes) => {
        this.actividadesRecientes = clientes.map(c => ({
          descripcion: `Nuevo cliente registrado: ${c.nombre} ${c.apellidos}`,
          fecha: new Date()   // Aquí podrías mapear a fecha real si tuvieras en el objeto
        }));
      },
      error: (err) => {
        console.error('Error cargando clientes recientes:', err);
      }
    });
  }
}
