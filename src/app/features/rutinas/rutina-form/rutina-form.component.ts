import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { Rutina } from '@app/domain/rutina.model';
import { ItemRutinaEjercicio } from '@app/domain/item-rutina-ejercicio.model';
import { ItemRutinaMedida } from '@app/domain/item-rutina-medida.model';
import { RutinaService } from '@app/services/rutina/rutina.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rutina-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './rutina-form.component.html',
  styleUrls: ['./rutina-form.component.css']
})
export class RutinaFormComponent  {
  @Input() rutinaAEditar?: Rutina;
  @Output() guardado = new EventEmitter<void>();

  form: FormGroup;
  mensaje = '';
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private svc: RutinaService
  ) {
    // Definimos el formulario reactivo
    this.form = this.fb.group({
      clienteId: [0, Validators.required],
      objetivo: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      fechaRenovacion: ['', Validators.required],
      // ejercicios y medidas gestionarlos aparte o con FormArray si los quieres editar aquí
    });
  }
/*
  
  ngOnInit(): void {
    if (this.rutinaAEditar) {
      this.isEdit = true;
      // Cargamos los valores existentes en el form
      this.form.patchValue({
        clienteId: this.rutinaAEditar.cliente.idPersona,
        objetivo: this.rutinaAEditar.objetivo,
        fechaCreacion: this.rutinaAEditar.fechaCreacion,
        fechaRenovacion: this.rutinaAEditar.fechaRenovacion
      });
      // Si gestionas ejercicios/medidas con FormArray, aquí los inyectarías también
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.mensaje = 'Por favor completa todos los campos requeridos.';
      return;
    }
    this.mensaje = '';
    // Construimos el payload
    const payload = {
      ...this.form.value,
      ejercicios: this.rutinaAEditar?.ejercicios.slice() || [],
      medidas: this.rutinaAEditar?.medidas.slice() || []
    } as RutinaPayload;

    if (this.isEdit && this.rutinaAEditar) {
      this.svc.update(this.rutinaAEditar.idRutina, payload).subscribe({
        next: () => this.guardado.emit(),
        error: err => this.mensaje = 'Error al actualizar: ' + (err.message || err)
      });
    } else {
      this.svc.create(payload).subscribe({
        next: () => this.guardado.emit(),
        error: err => this.mensaje = 'Error al crear: ' + (err.message || err)
      });
    }
  }

  */
}
