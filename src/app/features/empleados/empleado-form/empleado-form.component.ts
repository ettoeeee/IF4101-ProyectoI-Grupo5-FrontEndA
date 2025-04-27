import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Empleado } from '../../../domain/empleado.model';
import { EmpleadoService } from '../../../services/empleado/empleado.service';

@Component({
  selector: 'app-empleado-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './empleado-form.component.html',
  styleUrls: ['./empleado-form.component.css']
})
export class EmpleadoFormComponent {
  @Input() empleadoAEditar?: Empleado;
  @Output() guardado = new EventEmitter<void>();
  empleado: Empleado = {
    idEmpleado: 0,
    idPersona: 0,
    nombre: '',
    apellidos: '',
    fechaNacimiento: '',
    sexo: 'O',
    telefono: '',
    correoElectronico: '',
    imagenRuta: '',
    direccion: '',
    nombreContactoEmergencia: '',
    telContactoEmergencia: '',
    rolEmpleado: ''
  };
  isEdit = false;
  mensaje = '';

  constructor(
    private service: EmpleadoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.service.getById(+id).subscribe(e => this.empleado = e);
    }
  }

  cancelar(): void {
    this.router.navigate(['/empleados']);
  }

  guardar(): void {
    if (this.isEdit) {
      this.service.update(this.empleado.idEmpleado, this.empleado).subscribe({
        next: () => this.router.navigate(['/empleados']),
        error: e => this.mensaje = 'Error al actualizar: ' + e.message
      });
    } else {
      this.service.create(this.empleado).subscribe({
        next: () => this.router.navigate(['/empleados']),
        error: e => this.mensaje = 'Error al crear: ' + e.message
      });
    }
  }
}
