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
import { ItemRutinaMedida } from '@app/domain/item-rutina-medida.model';
import { ItemRutinaEjercicio } from '@app/domain/item-rutina-ejercicio.model';
import { MedidasCorporalesService } from '@app/services/medidaCorporal/medidas-corporales.service';
import { forkJoin } from 'rxjs';


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
  modoEdicion = false;
medidasInicialesParaEditar: ItemRutinaMedida[] = [];
ejerciciosInicialesParaEditar: ItemRutinaEjercicio[] = [];

tieneRutinaVigente: boolean = false;
verificandoRutina: boolean = false;
enviando: boolean = false;


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
@ViewChild(ItemRutinaMedidasComponent, { static: false })
itemRutinaMedidasComp?: ItemRutinaMedidasComponent;

@ViewChild(ItemRutinaEjercicioComponent, { static: false })
itemRutinaEjerciciosComp?: ItemRutinaEjercicioComponent;


  constructor(
    private route: ActivatedRoute,
    private clienteService: ClienteService,
    private http: HttpClient,
     private medidasService: MedidasCorporalesService 
  ) {}


get medidasConvertidas(): ItemRutinaMedida[] {
  return (this.rutina.medidas || []).map(m => ({
    medidaCorporal: {
      codMedida: m.idMedidaCorporal,
      nombreMedida: '',     // rellena si querés
      unidadMedida: '',     // rellena si querés
      imagen: ''            // rellena si querés
    },
    valorMedida: m.valorMedida
  }));
}


get ejerciciosConvertidos(): ItemRutinaEjercicio[] {
  return (this.rutina.ejercicios || []).map(e => ({
    idRutina: this.rutina.idRutina || 0,
    idEjercicio: e.idEjercicio,
    seriesEjercicio: e.series,
    repeticionesEjercicio: e.repeticiones,
    equipoEjercicio: e.equipo
  }));
}


 ngOnInit(): void {
  const idCliente = this.route.snapshot.paramMap.get('clienteId');
  const idRutina = this.route.snapshot.paramMap.get('id');

  if (idCliente && idRutina) {
    this.modoEdicion = true;

    this.http.get<RutinaCompletaDTO>(
      `${environment.apiBaseUrl}/clientes/${idCliente}/rutinas/${idRutina}/completa`
    ).subscribe({
      next: rutina => {
        this.rutina = rutina;
        this.objetivo = rutina.objetivo;
        this.horario = rutina.horario;
        this.lesiones = rutina.lesiones;
        this.padecimientos = rutina.padecimientos;

        console.log(' Rutina cargada', rutina);

        this.clienteSeleccionado = {
          ...rutina.cliente,
          fechaNacimiento: ''
        };

        //   medidas con detalles completos
        const idsMedidas = rutina.medidas.map(m => m.idMedidaCorporal);
        forkJoin(idsMedidas.map(id =>
          this.medidasService.getPorId(id)
        )).subscribe(detalles => {
          this.medidasInicialesParaEditar = rutina.medidas.map((m, index) => ({
            medidaCorporal: detalles[index],
            valorMedida: m.valorMedida
          }));
        });

        // ejercicios con detalles completos
        const idsEjercicios = rutina.ejercicios.map(e => e.idEjercicio);
        forkJoin(idsEjercicios.map(id =>
          this.http.get<any>(`${environment.apiBaseUrl}/ejercicios/${id}`)
        )).subscribe(detalles => {
          this.ejerciciosInicialesParaEditar = rutina.ejercicios.map((e, index) => ({
            idRutina: rutina.idRutina,
            idEjercicio: e.idEjercicio,
            seriesEjercicio: e.series,
            repeticionesEjercicio: e.repeticiones,
            equipoEjercicio: e.equipo,
            nombreEjercicio: detalles[index].nombreEjercicio,
            imagen: detalles[index].imagen
          }));
        });

      },
      error: err => console.error('No se pudo cargar rutina para editar', err)
    });
  }

  this.clienteService.obtenerClientes().subscribe(data => {
    this.clientes = data;
  });
}
seleccionarCliente(cliente: Cliente): void {
  this.clienteSeleccionado = cliente;
  this.verificandoRutina = true;
  this.tieneRutinaVigente = false;

  this.http.get<boolean>(`${environment.apiBaseUrl}/clientes/${cliente.idCliente}/rutinas/vigente`)
    .subscribe({
      next: (tieneVigente) => {
        this.tieneRutinaVigente = tieneVigente;
        this.verificandoRutina = false;
      },
      error: err => {
        console.error('Error al verificar rutina vigente', err);
        this.verificandoRutina = false;
      }
    });
}

  continuar(): void {
  // Validación básica
  if (!this.clienteSeleccionado?.idCliente) {
    alert('Selecciona un cliente válido primero');
    console.error(' Cliente no definido o sin ID');
    return;
  }

  const idCliente = this.clienteSeleccionado.idCliente;
const url = `${environment.apiBaseUrl}/clientes/${idCliente}/rutinas/vigente`;

  this.http.get<boolean>(url).subscribe({
    next: (tieneRutina) => {
      if (tieneRutina && !this.modoEdicion) {
        alert('⚠️ Este cliente ya tiene una rutina vigente. No se puede crear otra hasta que expire.');
        return;
      }

      // Si está permitido continuar, avanzar al siguiente paso
      this.stepper.next();

      // Asignar los datos a la rutina
      this.rutina.objetivo = this.objetivo;
      this.rutina.lesiones = this.lesiones;
      this.rutina.padecimientos = this.padecimientos;
      this.rutina.horario = this.horario;
      this.rutina.fechaCreacion = new Date().toISOString();

      // Si no hay fecha de renovación, establecer a 3 meses desde hoy
      if (!this.rutina.fechaRenovacion) {
        const fechaRenovacion = new Date();
        fechaRenovacion.setMonth(fechaRenovacion.getMonth() + 3);
        this.rutina.fechaRenovacion = fechaRenovacion.toISOString();
      }

      this.rutina.idInstructor = 1; // ← cambiar esto cuando haya login real
    },
    error: err => {
      console.error('❌ Error al verificar rutina vigente', err);
      alert('Ocurrió un error al verificar la rutina vigente. Intenta más tarde.');
    }
  });
}



private continuarRutina(): void {
  this.stepper.next();

  this.rutina.objetivo = this.objetivo;
  this.rutina.lesiones = this.lesiones;
  this.rutina.padecimientos = this.padecimientos;
  this.rutina.horario = this.horario;
  this.rutina.fechaCreacion = new Date().toISOString();
  this.rutina.fechaRenovacion = new Date().toISOString(); // se recalcula en backend si es necesario
  this.rutina.idInstructor = 1;
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

  if (this.enviando) {
    alert('⏳ Ya se está procesando la creación de la rutina. Espera un momento...');
    return;
  }

  this.enviando = true; // bloquear siguientes clics

  // Actualizar valores
  this.rutina.objetivo = this.objetivo;
  this.rutina.lesiones = this.lesiones;
  this.rutina.padecimientos = this.padecimientos;
  this.rutina.horario = this.horario;
  this.rutina.fechaCreacion = new Date().toISOString();

  // Fecha renovación por omisión: 3 meses después
  if (!this.rutina.fechaRenovacion) {
    const fechaRenovacion = new Date();
    fechaRenovacion.setMonth(fechaRenovacion.getMonth() + 3);
    this.rutina.fechaRenovacion = fechaRenovacion.toISOString();
  }

  this.rutina.idInstructor = 1; // cambiar si usas login

  // Preparar medidas
  this.rutina.medidas = (this.itemRutinaMedidasComp?.rutina || [])
    .filter(item => item.medidaCorporal?.codMedida !== undefined)
    .map(item => ({
      idMedidaCorporal: item.medidaCorporal.codMedida!,
      valorMedida: item.valorMedida,
      fechaMedicion: new Date().toISOString().substring(0, 10)
    }));

  // Preparar ejercicios
  this.rutina.ejercicios = (this.itemRutinaEjerciciosComp?.items || [])
    .filter(item => item.idEjercicio !== undefined)
    .map(item => ({
      idEjercicio: item.idEjercicio!,
      series: item.seriesEjercicio,
      repeticiones: item.repeticionesEjercicio,
      equipo: item.equipoEjercicio
    }));

  // DTO a enviar
  const rutinaDTO: RutinaCompletaDTO = {
    idRutina: this.rutina.idRutina!,
    idInstructor: this.rutina.idInstructor!,
    objetivo: this.rutina.objetivo || '',
    lesiones: this.rutina.lesiones || '',
    padecimientos: this.rutina.padecimientos || '',
    horario: this.rutina.horario || '',
    fechaCreacion: this.rutina.fechaCreacion!,
    fechaRenovacion: this.rutina.fechaRenovacion!,
    medidas: this.rutina.medidas!,
    ejercicios: this.rutina.ejercicios!,
    cliente: {
      idPersona: this.clienteSeleccionado.idPersona,
      nombre: this.clienteSeleccionado.nombre,
      apellidos: this.clienteSeleccionado.apellidos,
      sexo: this.clienteSeleccionado.sexo,
      telefono: this.clienteSeleccionado.telefono,
      correoElectronico: this.clienteSeleccionado.correoElectronico,
      imagenRuta: this.clienteSeleccionado.imagenRuta || '',
      direccion: this.clienteSeleccionado.direccion || '',
      nombreContactoEmergencia: this.clienteSeleccionado.nombreContactoEmergencia || '',
      telContactoEmergencia: this.clienteSeleccionado.telContactoEmergencia || '',
      fechaNacimiento: this.clienteSeleccionado.fechaNacimiento || '',
      activo: this.clienteSeleccionado.activo
    }
  };

  // Verificar si ya tiene una rutina vigente antes de crear (solo en modo creación)
  if (!this.modoEdicion) {
const url = `${environment.apiBaseUrl}/clientes/${this.clienteSeleccionado!.idCliente}/rutinas/vigente`;
    this.http.get<boolean>(url).subscribe({
      next: (tieneRutina) => {
        if (tieneRutina) {
          alert('⚠️ Este cliente ya tiene una rutina vigente. No se puede crear otra.');
          this.enviando = false;
          return;
        }

        // Crear rutina
        this.crearRutina(rutinaDTO);
      },
      error: err => {
        console.error('❌ Error al verificar rutina vigente', err);
        alert('Ocurrió un error al verificar rutina vigente');
        this.enviando = false;
      }
    });
  } else {
    // Modo edición
    this.http.put(`${environment.apiBaseUrl}/clientes/${this.clienteSeleccionado.idCliente}/rutinas/${this.rutina.idRutina}`, rutinaDTO)
      .subscribe({
        next: () => {
          alert('✅ Rutina actualizada correctamente');
          localStorage.removeItem('itemsRutina');
          this.enviando = false;
        },
        error: err => {
          console.error('❌ Error al actualizar rutina', err);
          this.enviando = false;
        }
      });
  }
}

// Método auxiliar para crear rutina
private crearRutina(rutinaDTO: RutinaCompletaDTO): void {
this.http.post(`${environment.apiBaseUrl}/clientes/${this.clienteSeleccionado!.idCliente}/rutinas/completa`, rutinaDTO)
  .subscribe({
    next: () => {
      alert('✅ Rutina creada correctamente');
      localStorage.removeItem('itemsRutina');
      this.enviando = false;
    },
    error: err => {
      this.enviando = false;

      if (err.status === 409) {
        alert('⚠️ El cliente ya tiene una rutina vigente. No se puede crear otra.');
      } else {
        console.error('❌ Error al guardar rutina', err);
        alert('Ocurrió un error al guardar la rutina');
      }
    }
  });

}


}
