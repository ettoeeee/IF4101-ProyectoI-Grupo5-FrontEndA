import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Ejercicio } from '@app/domain/ejercicio.model';
import { CategoriaEjercicio } from '@app/domain/categoriaejercicio.model';
import { EjercicioService } from '@app/services/ejercicio/ejercicio.service';
import { CategoriaEjercicioService } from '@app/services/categoriaejercicio/categoriaejercicio.service';

@Component({
  selector: 'app-ejercicios',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './ejercicios.component.html',
  styleUrls: ['./ejercicios.component.css']
})
export class EjerciciosComponent implements OnInit {
  ejercicios: Ejercicio[] = [];
  ejerciciosFiltrados: Ejercicio[] = [];
  categorias: CategoriaEjercicio[] = [];
  ejercicioForm: FormGroup;
  mostrarModal: boolean = false;
  editando: boolean = false;
  idEditando: number | null = null;
  filtro: string = '';

  constructor(
    private ejercicioService: EjercicioService,
    private categoriaService: CategoriaEjercicioService,
    private fb: FormBuilder
  ) {
    this.ejercicioForm = this.fb.group({
      nombreEjercicio: ['', Validators.required],
      idCategoria: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.obtenerEjercicios();
    this.obtenerCategorias();
  }

  obtenerEjercicios() {
    this.ejercicioService.obtenerEjercicios().subscribe(data => {
      this.ejercicios = data;
      this.filtrarEjercicios();
    });
  }

  obtenerCategorias() {
    this.categoriaService.obtenerCategorias().subscribe(data => {
      this.categorias = data;
    });
  }

  filtrarEjercicios() {
    this.ejerciciosFiltrados = this.ejercicios.filter(ejercicio =>
      ejercicio.nombreEjercicio.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  abrirModalNueva() {
    this.editando = false;
    this.ejercicioForm.reset();
    this.mostrarModal = true;
  }

  abrirModalEditar(ejercicio: Ejercicio) {
    this.editando = true;
    this.idEditando = ejercicio.idEjercicio;
    this.ejercicioForm.patchValue({
      nombreEjercicio: ejercicio.nombreEjercicio,
      idCategoria: ejercicio.categoriaEjercicio[0]?.idCategoriaEjercicio
    });
    this.mostrarModal = true;
  }

  guardarEjercicio() {
    if (this.ejercicioForm.invalid) return;

    const ejercicio: Ejercicio = {
      idEjercicio: 0,
      nombreEjercicio: this.ejercicioForm.value.nombreEjercicio,
      categoriaEjercicio: [{ idCategoriaEjercicio: +this.ejercicioForm.value.idCategoria, nombreCategoria: '' }]
    };

    if (this.editando && this.idEditando !== null) {
      this.ejercicioService.actualizarEjercicio(this.idEditando, ejercicio).subscribe(() => {
        this.obtenerEjercicios();
        this.cerrarModal();
      });
    } else {
      this.ejercicioService.crearEjercicio(ejercicio).subscribe(() => {
        this.obtenerEjercicios();
        this.cerrarModal();
      });
    }
  }

  eliminarEjercicio(id: number) {
    if (confirm('¿Está seguro de eliminar este ejercicio?')) {
      this.ejercicioService.eliminarEjercicio(id).subscribe(() => {
        this.obtenerEjercicios();
      });
    }
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.idEditando = null;
  }
}
