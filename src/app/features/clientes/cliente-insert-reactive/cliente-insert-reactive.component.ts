import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClienteService } from '@app/services/cliente/cliente.service';
import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { Cliente } from '@app/domain/cliente.model';

@Component({
  selector: 'app-cliente-insert-reactive',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cliente-insert-reactive.component.html',
  styleUrls: ['./cliente-insert-reactive.component.css']
})
export class ClienteInsertReactiveComponent implements OnInit {
  form: FormGroup;

  @Input() clienteAEditar?: Cliente;
  @Output() guardado = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private clienteService: ClienteService) {
    this.form = this.fb.group({
      idPersona: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      sexo: ['', Validators.required],
      telefono: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      imagenRuta: [''],
      direccion: [''], // 🔥 Nuevo campo
      nombreContactoEmergencia: [''], // 🔥 Nuevo campo
      telContactoEmergencia: [''], // 🔥 Nuevo campo
      activo: [true]
    });
    
  }

  ngOnInit() {
    if (this.clienteAEditar) {
      this.form.patchValue(this.clienteAEditar);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.clienteAEditar && this.clienteAEditar.idPersona) {
        const clienteActualizado = { ...this.clienteAEditar, ...this.form.value };
       
// 🔍 AGREGA ESTO AQUÍ
console.log('ID que se va a enviar:', clienteActualizado.idPersona);
console.log('Objeto a enviar:', clienteActualizado);

        this.clienteService.actualizarCliente(clienteActualizado).subscribe({
          next: (respuesta: any) => {
            alert('✅ ' + respuesta.mensaje);
            this.guardado.emit();
          },
          error: err => {
            alert('❌ Error al actualizar: ' + err.message);
          }
        });
      } else {
        this.clienteService.registrarCliente(this.form.value).subscribe({
          next: (respuesta: any) => {
            alert('✅ ' + respuesta.mensaje);
            this.guardado.emit();
          },
          error: err => {
            alert('❌ Error al registrar: ' + err.message);
          }
        });
      }
    }
  }
}
