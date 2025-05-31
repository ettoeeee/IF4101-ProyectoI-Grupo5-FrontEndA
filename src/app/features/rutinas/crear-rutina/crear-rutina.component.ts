import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatStepper } from '@angular/material/stepper';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@environments/environment';
import { ItemRutinaMedidasComponent } from '@app/features/itemRutinaMedida/item-rutina-medidas.component';
import { ItemRutinaEjercicioComponent } from '@app/features/itemRutinaEjercicio/item-rutina-ejercicios/item-rutina-ejercicios.component';

import { Cliente } from '@app/domain/cliente.model';
import { ClienteService } from '@app/services/cliente/cliente.service';
import { RutinaCompletaDTO } from '@app/domain/dto/RutinaCompletaDTO';
import { ItemRutinaMedidaDTO } from '@app/domain/dto/RutinaCompletaDTO';
import { ItemRutinaEjercicioDTO } from '@app/domain/dto/RutinaCompletaDTO';

@Component({
  selector: 'app-crear-rutina',
  standalone: true,
  templateUrl: './crear-rutina.component.html',
  styleUrls: ['./crear-rutina.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
        ItemRutinaMedidasComponent ,
            ItemRutinaEjercicioComponent

  ]
})
export class CrearRutinaComponent implements OnInit {
  clientes: Cliente[] = [];
  clienteSeleccionado: Cliente | null = null;

  objetivo = '';
  horario = '';
  lesiones = '';
  padecimientos = '';

  medidaInput: ItemRutinaMedidaDTO = {
    idMedidaCorporal: 0,
    valorMedida: 0,
    fechaMedicion: new Date().toISOString().substring(0, 10)
  };

  ejercicioInput: ItemRutinaEjercicioDTO = {
    idEjercicio: 0,
    series: 0,
    repeticiones: 0,
    equipo: ''
  };

  rutina: Partial<RutinaCompletaDTO> = {
    medidas: [],
    ejercicios: []
  };



  @ViewChild('stepper') stepper!: MatStepper;

  // Usar @ViewChild para acceder al componente
   @ViewChild(ItemRutinaMedidasComponent)
itemRutinaMedidasComp!: ItemRutinaMedidasComponent;
@ViewChild(ItemRutinaEjercicioComponent)
itemRutinaEjerciciosComp!: ItemRutinaEjercicioComponent;


  constructor(
    private route: ActivatedRoute,
    private clienteService: ClienteService,
    private http: HttpClient
  ) {}

  
  ngOnInit(): void {


    this.clienteService.obtenerClientes().subscribe(data => {
      this.clientes = data;
    });
  }

  seleccionarCliente(cliente: Cliente): void {
    this.clienteSeleccionado = cliente;
  }

  
  continuar(): void {
   if (!this.clienteSeleccionado) {
    alert('Selecciona un cliente primero');
    return;
  }
  this.stepper.next();

    this.rutina.objetivo = this.objetivo;
    this.rutina.lesiones = this.lesiones;
    this.rutina.padecimientos = this.padecimientos;
    this.rutina.horario = this.horario;
    this.rutina.fechaCreacion = new Date().toISOString();
    this.rutina.fechaRenovacion = new Date().toISOString();
    this.rutina.idInstructor = 1; // cambiar si tienes autenticación real
  }

  agregarMedida(): void {
    if (this.rutina.medidas) {
      this.rutina.medidas.push({ ...this.medidaInput });
    }
  }

  agregarEjercicio(): void {
    if (this.rutina.ejercicios) {
      this.rutina.ejercicios.push({ ...this.ejercicioInput });
    }
  }

  continuarDesdeMedidas(): void {
    this.stepper.next();
  }

  continuarDesdeEjercicios(): void {
    this.stepper.next();
  }








 finalizar(): void {
  if (!this.clienteSeleccionado?.idCliente) {
    console.error('ID de cliente no definido');
    return;
  }

  // 🧠 Setear valores comunes de rutina
  this.rutina.objetivo = this.objetivo;
  this.rutina.lesiones = this.lesiones;
  this.rutina.padecimientos = this.padecimientos;
  this.rutina.horario = this.horario;
  this.rutina.fechaCreacion = new Date().toISOString();
  this.rutina.fechaRenovacion = new Date().toISOString();
  this.rutina.idInstructor = 1; // o el real si hay auth

  // ✅ Obtener medidas del componente que no debe tocarse
  this.rutina.medidas = (this.itemRutinaMedidasComp?.rutina || [])
    .filter(item => item.medidaCorporal && item.medidaCorporal.codMedida !== undefined)
    .map(item => ({
      idMedidaCorporal: item.medidaCorporal.codMedida!,
      valorMedida: item.valorMedida,
      fechaMedicion: new Date().toISOString().substring(0, 10)
    }));

  // ✅ Convertir ejercicios al formato esperado por el backend (DTO)
  const ejerciciosLocalStorage = localStorage.getItem('itemsRutina');
  this.rutina.ejercicios = [];

  if (ejerciciosLocalStorage) {
    try {
      const parsed = JSON.parse(ejerciciosLocalStorage);
const vistos = new Set();
this.rutina.ejercicios = parsed
  .filter((e: any) => {
    const key = e.idEjercicio;
    if (vistos.has(key)) return false;
    vistos.add(key);
    return true;
  })
  .map((e: any) => ({
    idEjercicio: e.idEjercicio,
    series: e.seriesEjercicio,
    repeticiones: e.repeticionesEjercicio,
    equipo: e.equipoEjercicio
  
      }));
    } catch (e) {
      console.error("❌ Error al parsear ejercicios del localStorage", e);
      this.rutina.ejercicios = [];
    }
  }

  // ✅ Preparar objeto final DTO
  const rutinaDTO: RutinaCompletaDTO = {
    idInstructor: this.rutina.idInstructor!,
    objetivo: this.rutina.objetivo || '',
    lesiones: this.rutina.lesiones || '',
    padecimientos: this.rutina.padecimientos || '',
    horario: this.rutina.horario || '',
    fechaCreacion: this.rutina.fechaCreacion!,
    fechaRenovacion: this.rutina.fechaRenovacion!,
    medidas: this.rutina.medidas!,
    ejercicios: this.rutina.ejercicios!
  };

  // ✅ Enviar al backend
  this.http.post(`${environment.apiBaseUrl}/clientes/${this.clienteSeleccionado.idCliente}/rutinas/completa`, rutinaDTO)
    .subscribe({
      next: () => {
        alert('Rutina creada correctamente');
        localStorage.removeItem('itemsRutina');
      },
      error: (err) => {
        console.error('❌ Error al guardar rutina', err);
      }
    });
}



}
