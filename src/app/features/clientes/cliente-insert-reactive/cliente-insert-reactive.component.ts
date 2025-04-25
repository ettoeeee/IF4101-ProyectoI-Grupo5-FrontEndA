import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../services/cliente.service';
@Component({
  selector: 'app-cliente-insert-reactive',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cliente-insert-reactive.component.html',
  styleUrls: ['./cliente-insert-reactive.component.css']
})
export class ClienteInsertReactiveComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private clienteService: ClienteService) {
     this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      sexo: ['', Validators.required],
      telefono: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      imagenRuta: [''],
      activo: [true]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.clienteService.registrarCliente(this.form.value).subscribe({
        next: (respuesta: any) => {
          alert('✅ ' + respuesta.mensaje); // o usar snackbar si querés
        },
        error: err => {
          alert('❌ Error al registrar: ' + err.message);
        }
      });
      
    }
  }
  
}
