import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Ejercicio } from '@app/domain/ejercicio.model';
import { CategoriaEjercicio } from '@app/domain/categoriaejercicio.model';
import { FotografiaEjercicio } from '@app/domain/fotografiaejercicio.model';
import { EjercicioService } from '@app/services/ejercicio/ejercicio.service';

@Component({
  selector: 'app-ejercicio',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './ejercicios.component.html',
  styleUrls: ['./ejercicios.component.css']
})
export class EjercicioComponent implements OnInit {
  ejercicio: Ejercicio = {
    idEjercicio: 0,
    nombreEjercicio: '',
    categoriaEjercicio: [],
    fotografiasEjercicio: []
  };

  ejercicios: Ejercicio[] = [];
  ejerciciosFiltrados: Ejercicio[] = [];
  categorias: CategoriaEjercicio[] = [];
  categoriasSeleccionadas: CategoriaEjercicio[] = [];
  archivoFoto: File | null = null;
  filtro: string = '';
  mostrarModal: boolean = false;
  editando: boolean = false;
  idEditando: number | null = null;
  ejercicioForm: any;

  constructor(private ejercicioService: EjercicioService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.cargarCategorias();
    this.obtenerEjercicios();
    this.inicializarFormulario();
  }

  inicializarFormulario(): void {
    this.ejercicioForm = this.fb.group({
      nombreEjercicio: ['', Validators.required],
      idCategoria: ['', Validators.required]
    });
  }

  obtenerEjercicios(): void {
    this.ejercicioService.obtenerEjercicios().subscribe((data: Ejercicio[]) => {
      this.ejercicios = data;
      this.filtrarEjercicios();
    });
  }

  filtrarEjercicios(): void {
    this.ejerciciosFiltrados = this.ejercicios.filter(ejercicio =>
      ejercicio.nombreEjercicio.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  cargarCategorias(): void {
    this.ejercicioService.obtenerCategorias().subscribe((categorias: CategoriaEjercicio[]) => {
      this.categorias = categorias;
    }, (error) => {
      console.error('Error al cargar categorías', error);
    });
  }

  agregarFoto(event: any): void {
    const archivo = event.target.files[0];
    if (archivo) {
      this.archivoFoto = archivo;
    }
  }

  abrirModalNueva(): void {
    this.editando = false;
    this.idEditando = null;
    this.ejercicioForm.reset();
    this.mostrarModal = true;
  }

  abrirModalEditar(ejercicio: Ejercicio): void {
    this.editando = true;
    this.idEditando = ejercicio.idEjercicio;
    this.ejercicioForm.setValue({
      nombreEjercicio: ejercicio.nombreEjercicio,
      idCategoria: ejercicio.categoriaEjercicio[0].idCategoriaEjercicio
    });
    this.archivoFoto = null;  // Si hay una imagen asociada, puedes cargarla aquí
    this.mostrarModal = true;
  }

  guardarEjercicio(): void {
    if (this.ejercicioForm.invalid) return;
  
    const ejercicioNuevo: Ejercicio = {
      idEjercicio: this.idEditando || 0,
      nombreEjercicio: this.ejercicioForm.value.nombreEjercicio,
      categoriaEjercicio: this.categorias.filter(c => c.idCategoriaEjercicio === this.ejercicioForm.value.idCategoria),
      fotografiasEjercicio: []  // Asegurarnos de que si hay foto, se añade
    };
  
    if (this.archivoFoto) {
      const formData = new FormData();
      formData.append('foto', this.archivoFoto, this.archivoFoto.name);
      formData.append('ejercicio', JSON.stringify(ejercicioNuevo));
  
      // Llamamos al servicio para crear el ejercicio con foto
      this.ejercicioService.crearEjercicioConFotos(ejercicioNuevo, formData).subscribe(response => {
        console.log('Ejercicio guardado con foto', response);
        this.obtenerEjercicios();
        this.cerrarModal();
      }, error => {
        console.error('Error al guardar ejercicio con foto', error);
      });
    } else {
      // Si no hay foto, llamamos al servicio sin fotos
      this.ejercicioService.crearEjercicio(ejercicioNuevo).subscribe(response => {
        console.log('Ejercicio guardado', response);
        this.obtenerEjercicios();
        this.cerrarModal();
      });
    }
  }
  

  eliminarEjercicio(id: number): void {
    if (confirm('¿Está seguro de eliminar este ejercicio?')) {
      this.ejercicioService.eliminarEjercicio(id).subscribe(() => {
        this.obtenerEjercicios();
      });
    }
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.idEditando = null;
    this.ejercicioForm.reset();
  }
}
