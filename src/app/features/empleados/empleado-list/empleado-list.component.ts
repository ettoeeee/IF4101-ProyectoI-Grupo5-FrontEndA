import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Empleado } from '../../../domain/empleado.model';
import { EmpleadoService } from '../../../services/empleado/empleado.service';
import { EmpleadoFormComponent } from '../empleado-form/empleado-form.component';

@Component({
  selector: 'app-empleado-list',
  standalone: true,
  imports: [CommonModule, FormsModule, EmpleadoFormComponent],
  templateUrl: './empleado-list.component.html',
  styleUrls: ['./empleado-list.component.css']
})
export class EmpleadoListComponent implements OnInit {
  empleados: Empleado[] = [];
  filtro = '';                          // para ngModel
  mostrarModal = false;                 // controla el modal
  empleadoSeleccionado?: Empleado;      // empleado a editar

  constructor(private service: EmpleadoService) { }

  ngOnInit(): void {
    this.loadEmpleados();
  }

  loadEmpleados(): void {
    this.service.getAll().subscribe({
      next: list => this.empleados = list,
      error: _ => this.empleados = []
    });
  }

  // 🔍 Filtrado según el input [(ngModel)]="filtro"
  filtrarEmpleados(): Empleado[] {
    const txt = this.filtro.toLowerCase();
    return this.empleados.filter(e =>
      e.nombre.toLowerCase().includes(txt) ||
      e.apellidos.toLowerCase().includes(txt) ||
      e.rolEmpleado.toLowerCase().includes(txt) ||
      e.telefono.includes(txt)
    );
  }

  // ✏️/➕ Abrir modal de crear o editar
  abrirModal(e?: Empleado): void {
    this.empleadoSeleccionado = e;
    this.mostrarModal = true;
  }

  // ❌ Cerrar modal y recargar lista
  cerrarModal(): void {
    this.mostrarModal = false;
    this.empleadoSeleccionado = undefined;
    this.loadEmpleados();
  }

  // 🗑️ Eliminar empleado
  eliminarEmpleado(id: number): void {
    if (!confirm('¿Desea eliminar este empleado?')) return;
    this.service.delete(id).subscribe({
      next: () => this.loadEmpleados(),
      error: err => alert('Error al eliminar: ' + err.message)
    });
  }
}
