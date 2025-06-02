import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MedidasCorporalesService } from '@app/services/medidaCorporal/medidas-corporales.service';
import { Component, EventEmitter, Output, Input, OnInit, OnChanges } from '@angular/core';
import { MedidaCorporal } from '@app/domain/medidaCorporal.model';
import Swal from 'sweetalert2';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-medida-insert-reactive',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './medida-insert-reactive.component.html',
  styleUrls: ['./medida-insert-reactive.component.css']
})

export class MedidaInsertReactiveComponent implements OnInit, OnChanges {
  form: FormGroup;

  @Input() medidaAEditar?: MedidaCorporal;
  @Output() guardado = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder, 
    private medidasService: MedidasCorporalesService
  ) {
    this.form = this.fb.group({
      tipoMedida: ['', [Validators.required]],
      unidad: ['', Validators.required],
      imagenRuta: ['']
    });
  }

  
  medidasExistentes: MedidaCorporal[] = [];
  cargandoImagen: boolean = false;
  porcentajeCarga: number = 0;
  imagenPreview: string| ArrayBuffer | null = null;
    
  ngOnInit() {
    if (this.medidaAEditar) {
      this.form.patchValue(this.medidaAEditar);
    }

    this.medidasService.obtenerMedidas().subscribe({
      next: (medidas: MedidaCorporal[]) => {
        this.medidasExistentes = medidas;
      },
      error: (err) => {
        console.error('Error al cargar medidas:', err);
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;
  
      const medidaParaEnviar = {
        nombreMedida: formValue.tipoMedida,
        unidadMedida: formValue.unidad,
        imagen: formValue.imagenRuta
      };
  
      if (this.medidaAEditar && this.medidaAEditar.codMedida) {
        const medidaActualizada = {
          codMedida: this.medidaAEditar.codMedida,
          ...medidaParaEnviar
        };
  
        this.medidasService.actualizarMedida(
          this.medidaAEditar.codMedida,
          medidaActualizada
        ).subscribe({
          next: () => {
            Swal.fire('✅ Éxito!', 'Medida actualizada correctamente', 'success');
            this.guardado.emit();
          },
          error: err => {
            this.manejarErrorHttp(err);
          }
        });
      } else {
        this.medidasService.crearMedida(medidaParaEnviar).subscribe({
          next: () => {
            Swal.fire('✅ Éxito!', 'Medida creada correctamente', 'success');
            this.guardado.emit();
          },
          error: err => {
            this.manejarErrorHttp(err);
          }
        });
      }
    }
  }
  

  private manejarErrorHttp(err: any): void {
    if (err.error && typeof err.error === 'string') {
      Swal.fire('Error', err.error, 'error');
    } else if (err.error && err.error.mensaje) {
      Swal.fire('Error', err.error.mensaje, 'error');
    } else {
      Swal.fire('Error', 'Ocurrió un error inesperado. Intente nuevamente.', 'error');
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagenPreview = reader.result;
        this.form.patchValue({ imagenRuta: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }
  
  ngOnChanges(): void {
    if (this.medidaAEditar) {
      this.form.patchValue({
        tipoMedida: this.medidaAEditar.nombreMedida,
        unidad: this.medidaAEditar.unidadMedida,
        imagenRuta: this.medidaAEditar.imagen
      });
      this.imagenPreview = this.medidaAEditar.imagen || null;
    }
  }
  
  
}
