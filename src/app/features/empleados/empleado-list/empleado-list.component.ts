import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Empleado } from '../../../domain/empleado.model';
import { EmpleadoService } from '../../../services/empleado/empleado.service';

@Component({
  selector: 'app-empleado-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './empleado-list.component.html',
  styleUrls: ['./empleado-list.component.css']
})
export class EmpleadoListComponent implements OnInit {
  empleados: Empleado[] = [];
  error = '';

  constructor(
    private service: EmpleadoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadEmpleados();
  }

  loadEmpleados(): void {
    this.service.getAll().subscribe({
      next: list => this.empleados = list,
      error: err => this.error = err.message || 'Error cargando empleados'
    });
  }

  crear(): void {
    this.router.navigate(['/empleados/nuevo']);
  }

  editar(e: Empleado): void {
    this.router.navigate([`/empleados/edit/${e.idEmpleado}`]);
  }

  eliminar(e: Empleado): void {
    if (!confirm(`Eliminar a ${e.nombre} ${e.apellidos}?`)) return;
    this.service.delete(e.idEmpleado).subscribe({
      next: () => this.loadEmpleados(),
      error: err => alert('Error al eliminar: ' + err.message)
    });
  }
}
