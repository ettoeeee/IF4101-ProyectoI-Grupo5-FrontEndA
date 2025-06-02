import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RutinaService } from '@app/services/rutina/rutina.service';
import { Router } from '@angular/router';
import { Rutina } from '@app/domain/rutina.model';
import { ClienteService } from '@app/services/cliente/cliente.service';
import { Cliente } from '@app/domain/cliente.model';
import { ViewEncapsulation } from '@angular/core';



@Component({
  selector: 'app-entrenador-panel',
  standalone: true,
  
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatTooltipModule
    
  ],
  templateUrl: './entrenador-panel.component.html',
  styleUrls: ['./entrenador-panel.component.scss'],
  encapsulation: ViewEncapsulation.None 
})
export class EntrenadorPanelComponent implements OnInit {
  rutinasActivas = 0;
  clientesTotales = 0;
  rutinasPorRenovar = 0;
  rutinasRecientes: Rutina[] = [];
  rutinasParaMostrar: any[] = []; // Nueva propiedad para datos formateados
 todosLosClientes: Cliente[] = [];
 loading = true;
  error: string | null = null;

  constructor(
    private rutinaService: RutinaService,
    private clienteService: ClienteService,
    public router: Router
  ) {}


 getNombreCliente(idCliente: number): string {
  const cliente = this.todosLosClientes.find(c => c.idCliente === idCliente);
  return cliente ? `${cliente.nombre} ${cliente.apellidos}` : `Cliente #${idCliente}`;
}


  private actualizarMetricas(rutinas: any[]) {
    this.rutinasActivas = rutinas.length;
    this.clientesTotales = [...new Set(rutinas.map(r => r.idCliente))].length;
    
    const hoy = new Date();
    this.rutinasPorRenovar = rutinas.filter(r => 
      new Date(r.fechaRenovacion) <= hoy
    ).length;
  }


formatearFecha(fecha: any): string {
  if (!fecha) return 'Sin fecha';
  try {
    const date = new Date(fecha);
    return isNaN(date.getTime()) 
      ? 'Sin fecha'
      : date.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
  } catch {
    return 'Sin fecha';
  }
}

  private obtenerMensajeError(err: any): string {
    if (err.status === 400) {
      return 'Parámetros incorrectos en la solicitud';
    } else if (err.status === 403) {
      return 'No tienes permisos para acceder a estos datos';
    } else if (err.status === 404) {
      return 'Endpoint no encontrado';
    } else {
      return 'Error al cargar las rutinas. Intente nuevamente.';
    }
  }


  verDetalleRutina(idRutina: number) {
    this.router.navigate(['/rutinas', idRutina]);
  }

  ngOnInit() {
  this.cargarClientes(); // Primero cargar clientes
}

cargarClientes() {
  this.clienteService.obtenerClientes().subscribe({
    next: (clientes) => {
      this.todosLosClientes = clientes;
      this.cargarRutinasRecientes(); // Luego cargar rutinas
    },
    error: (err) => {
      console.error('Error cargando clientes', err);
      this.cargarRutinasRecientes(); // Intentar cargar rutinas igual
    }
  });
}

cargarRutinasRecientes() {
  this.loading = true;
  this.error = null;

  const fechaLimite = new Date();
  fechaLimite.setDate(fechaLimite.getDate() - 30);

  this.rutinaService.getRutinasRecientes(fechaLimite).subscribe({
    next: (rutinas) => {
      this.rutinasParaMostrar = this.formatearDatosRutinas(rutinas);
      this.actualizarMetricas(rutinas);
      this.loading = false;
    },
    error: (err) => {
      console.error('Error cargando rutinas:', err);
      this.error = this.obtenerMensajeError(err);
      this.loading = false;
    }
  });
}

private formatearDatosRutinas(rutinas: any[]): any[] {
  return rutinas.map(r => {
    // Extraemos idCliente desde r.idCliente o r.cliente.idCliente o r.cliente.idPersona
    const idCliente = r.idCliente ?? r.cliente?.idCliente ?? r.cliente?.idPersona;

    return {
      ...r,
      idCliente, // lo guardamos para que esté disponible
      fechaCreacionFormateada: this.formatearFecha(r.fechaCreacion),
      clienteNombre: this.getNombreCliente(idCliente),
      objetivo: r.objetivo || 'Sin objetivo'
    };
  });
}

verRutinasPorCliente(): void {
  this.router.navigate(['/instructores/clientes']);
}

verRutinaDeCliente(clienteId: number): void {
  this.router.navigate(['/clientes', clienteId, 'rutinas']);
}
}