import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Ejercicio } from '@app/domain/ejercicio.model';
import { CategoriaEjercicio } from '@app/domain/categoriaejercicio.model';
import { FotografiaEjercicio } from '@app/domain/fotografiaejercicio.model';
import { EjercicioService } from '@app/services/ejercicio/ejercicio.service';
import { EjercicioCrearDTO } from '@app/domain/ejercicio.model';
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
  
    const ejercicioNuevo: EjercicioCrearDTO = {
      nombreEjercicio: this.ejercicioForm.value.nombreEjercicio,
      equipo: '', // Puedes poner campos reales luego
      series: 0,
      repeticiones: 0,
      idCategoria: this.ejercicioForm.value.idCategoria
    };
  
    // Primero: crear el ejercicio
    this.ejercicioService.crearEjercicio(ejercicioNuevo).subscribe(response => {
      console.log('Ejercicio creado:', response);
  
      // Luego: si hay una imagen seleccionada, subirla
      if (this.archivoFoto) {
        const formData = new FormData();
        formData.append('file', this.archivoFoto, this.archivoFoto.name);
  
        // Llamar al servicio para subir la imagen
        this.ejercicioService.subirFoto(response.idEjercicio, formData).subscribe(res => {
          console.log('Foto subida correctamente');
          this.obtenerEjercicios();
          this.cerrarModal();
        }, error => {
          console.error('Error subiendo foto', error);
        });
  
      } else {
        // Si no hay imagen, simplemente recargar la lista
        this.obtenerEjercicios();
        this.cerrarModal();
      }
    }, error => {
      console.error('Error al guardar ejercicio', error);
    });
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
