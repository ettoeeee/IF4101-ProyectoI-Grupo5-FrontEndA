import { Component, OnInit } from '@angular/core';
import { MedidasCorporalesService } from '../../services/medidaCorporal/medidas-corporales.service';
import { MedidaCorporal } from '../../domain/medidaCorporal.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-medidas-corporales',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './medidas-corporales.component.html',
  styleUrls: ['./medidas-corporales.component.css']
})
export class MedidasCorporalesComponent implements OnInit {
  medidas: MedidaCorporal[] = [];
  medidasFiltradas: MedidaCorporal[] = [];
  medidaForm: FormGroup;
  editando: boolean = false;
  idEditando: number | null = null;
  mostrarModal: boolean = false;
  filtro: string = '';

  constructor(
    private medidasService: MedidasCorporalesService,
    private fb: FormBuilder
  ) {
    this.medidaForm = this.fb.group({
      tipoMedida: ['', Validators.required],
      unidad: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.obtenerMedidas();
  }

  obtenerMedidas() {
    this.medidasService.obtenerMedidas().subscribe(data => {
      this.medidas = data;
      this.filtrarMedidas();
    });
  }

  filtrarMedidas() {
    this.medidasFiltradas = this.medidas.filter(medida =>
      medida.tipoMedida.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  abrirModalNueva() {
    this.editando = false;
    this.medidaForm.reset();
    this.mostrarModal = true;
  }

  abrirModalEditar(medida: MedidaCorporal) {
    this.editando = true;
    this.idEditando = medida.idMedidaCorporal;
    this.medidaForm.setValue({
      tipoMedida: medida.tipoMedida,
      unidad: medida.unidad
    });
    this.mostrarModal = true;
  }

  guardarMedida() {
    if (this.medidaForm.invalid) return;

    const medida: MedidaCorporal = {
      idMedidaCorporal: 0,
      ...this.medidaForm.value
    };

    if (this.editando && this.idEditando !== null) {
      this.medidasService.actualizarMedida(this.idEditando, medida).subscribe(() => {
        this.obtenerMedidas();
        this.cerrarModal();
      });
    } else {
      this.medidasService.crearMedida(medida).subscribe(() => {
        this.obtenerMedidas();
        this.cerrarModal();
      });
    }
  }

  eliminarMedida(id: number) {
    if (confirm('¿Está seguro de eliminar esta medida?')) {
      this.medidasService.eliminarMedida(id).subscribe(() => {
        this.obtenerMedidas();
      });
    }
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.idEditando = null;
  }

}

