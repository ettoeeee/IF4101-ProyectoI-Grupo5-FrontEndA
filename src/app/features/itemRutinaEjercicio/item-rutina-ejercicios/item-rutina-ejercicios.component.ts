import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { ItemRutinaEjercicioService } from '@app/services/itemRutinaEjercicio/item-rutina-ejercicio.service';
import { EjercicioService } from '@app/services/ejercicio/ejercicio.service';
import { ItemRutinaEjercicio } from '@app/domain/item-rutina-ejercicio.model';
import { Ejercicio } from '@app/domain/ejercicio.model';
import Swal from 'sweetalert2';
import { SimpleChanges } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-item-rutina-ejercicio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslateModule],
  templateUrl: './item-rutina-ejercicios.component.html',
  styleUrls: ['./item-rutina-ejercicios.component.css']
})

export class ItemRutinaEjercicioComponent implements OnInit , OnChanges {

  @Input() ejerciciosIniciales: ItemRutinaEjercicio[] = [];

  formulario: FormGroup;
  items: ItemRutinaEjercicio[] = [];
  ejercicios: Ejercicio[] = [];
  filtroCategoria: string = '';

  mostrarModal = false;
  modoEditar = false;
  idRutinaEditar: number | null = null;
  idEjercicioEditar: number | null = null;

  private ejercicioMap: Map<number, string> = new Map();

  

  constructor(
    private fb: FormBuilder,
    private itemService: ItemRutinaEjercicioService,
    private ejercicioService: EjercicioService
  ) {
    this.formulario = this.fb.group({
      //idRutina: ['', Validators.required],
      idEjercicio: ['', Validators.required],
      seriesEjercicio: [1, [Validators.required, Validators.min(1)]],
      repeticionesEjercicio: [1, [Validators.required, Validators.min(1)]],
      equipoEjercicio: ['', Validators.required]
    });
  }

ngOnChanges(): void {
  if (this.ejerciciosIniciales?.length) {
    console.log('🌀 ngOnChanges cargando ejercicios iniciales:', this.ejerciciosIniciales);
    this.items = [...this.ejerciciosIniciales];
  }
}



ngOnInit(): void {
  this.listarEjercicios(); // o lo que uses para cargar el catálogo

  if (this.ejerciciosIniciales?.length) {
    this.items = [...this.ejerciciosIniciales];
  }
}


  listarItems(): void {
    this.itemService.listarTodos().subscribe(data => {
      this.items = data;
    });
  }

  listarEjercicios(): void {
    this.ejercicioService.listarEjercicios().subscribe(data => {
      this.ejercicios = data;
    });
  }

  abrirModal(): void {
    this.formulario.reset({ seriesEjercicio: 1, repeticionesEjercicio: 1 });
    this.mostrarModal = true;
    this.modoEditar = false;
    this.idRutinaEditar = null;
    this.idEjercicioEditar = null;

    // Habilitar el campo idEjercicio por si quedó deshabilitado antes
    this.formulario.get('idEjercicio')?.enable();
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  guardar(): void {
    if (this.formulario.invalid) return;

    const nuevoItem: ItemRutinaEjercicio = this.formulario.value;

    if (this.modoEditar && this.idEjercicioEditar !== null) {
      const index = this.items.findIndex(i => i.idEjercicio === this.idEjercicioEditar);
      if (index !== -1) {
        this.items[index] = { ...this.items[index], ...nuevoItem };
      }

      Swal.fire('✅', 'Ejercicio editado localmente', 'success');
    } else {
      // Verifica que no se agregue dos veces el mismo ejercicio
      if (this.items.some(i => i.idEjercicio === nuevoItem.idEjercicio)) {
        Swal.fire('⚠️', 'Este ejercicio ya fue agregado.', 'warning');
        return;
      }

      // Validar que el ejercicio existe (para consistencia, aunque no lo vamos a guardar)
      const ejercicioRelacionado = this.ejercicios.find(e => e.idEjercicio === nuevoItem.idEjercicio);
      if (!ejercicioRelacionado) {
        Swal.fire('⚠️', 'No se pudo encontrar el ejercicio seleccionado.', 'error');
        return;
      }

      this.items.push(nuevoItem);
      Swal.fire('✅', 'Ejercicio agregado localmente', 'success');
    }

    this.cerrarModal();
  }


  editar(item: ItemRutinaEjercicio): void {
    this.mostrarModal = true;
    this.modoEditar = true;
    this.idRutinaEditar = item.idRutina;
    this.idEjercicioEditar = item.idEjercicio;

    this.formulario.patchValue({
      idRutina: item.idRutina,
      idEjercicio: item.idEjercicio,
      seriesEjercicio: item.seriesEjercicio,
      repeticionesEjercicio: item.repeticionesEjercicio,
      equipoEjercicio: item.equipoEjercicio
    });

    // Deshabilitar select de ejercicio en modo edición
    this.formulario.get('idEjercicio')?.disable();
  }

  eliminar(item: ItemRutinaEjercicio): void {
    if (confirm('¿Está seguro de eliminar este ejercicio?')) {
      this.itemService.eliminar(item.idRutina, item.idEjercicio).subscribe(() => {
        Swal.fire('✅', 'Ejercicio eliminado', 'success');
        this.listarItems();
      });
    }
  }

  obtenerNombreEjercicio(id: number): string {
  const ejercicio = this.ejercicios.find(e => e.idEjercicio === id);
  return ejercicio ? ejercicio.nombreEjercicio : 'Desconocido';
  }


  get itemsFiltrados(): ItemRutinaEjercicio[] {
    if (!this.filtroCategoria.trim()) {
      return this.items;
    }

    const filtroLower = this.filtroCategoria.toLowerCase();

    return this.items.filter(item => {
      const ejercicio = this.ejercicios.find(e => e.idEjercicio === item.idEjercicio);

      if (!ejercicio || !ejercicio.categoriaEjercicio) return false;

      return ejercicio.categoriaEjercicio.some(cat =>
        cat.nombreCategoria.toLowerCase().includes(filtroLower)
      );
    });
  }

}
