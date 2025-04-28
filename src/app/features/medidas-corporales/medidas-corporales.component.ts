import { Component, OnInit } from '@angular/core';
import { MedidasCorporalesService } from '@app/services/medidaCorporal/medidas-corporales.service';
import { MedidaCorporal } from '../../domain/medidaCorporal.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MedidaInsertReactiveComponent } from './medidas-insert-reactive/medida-insert-reactive.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medidas-corporales',
  standalone: true,
  imports: [CommonModule, FormsModule, MedidaInsertReactiveComponent],
  templateUrl: './medidas-corporales.component.html',
  styleUrls: ['./medidas-corporales.component.css']
})
export class MedidasCorporalesComponent implements OnInit {
  medidas: MedidaCorporal[] = [];
  medidasFiltradas: MedidaCorporal[] = [];
  medidaSeleccionada?: MedidaCorporal;
  mostrarModal = false;
  editando = false;
  filtro = '';

  constructor(private medidasService: MedidasCorporalesService) {}

  ngOnInit(): void {
    this.obtenerMedidas();
  }

  obtenerMedidas(): void {
    this.medidasService.obtenerMedidas().subscribe({
      next: (medidas) => {
        this.medidas = medidas;
        this.filtrarMedidas();
      },
      error: (err) => console.error('Error al cargar medidas', err)
    });
  }

  filtrarMedidas(): void {
    this.medidasFiltradas = this.medidas.filter(medida =>
      medida.nombreMedida.toLowerCase().includes(this.filtro.toLowerCase()) ||
      medida.unidadMedida.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  abrirModalNueva(): void {
    this.editando = false;
    this.medidaSeleccionada = undefined;
    this.mostrarModal = true;
  }

  abrirModalEditar(medida: MedidaCorporal): void {
    this.editando = true; // Marcar que estamos editando
  this.medidaSeleccionada = medida;
  this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.obtenerMedidas(); 
  }

  eliminarMedida(id: number): void {

     Swal.fire({
        title: '¿Está seguro?',
        text: 'Esta acción eliminará al cliente de forma permanente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result: { isConfirmed: boolean }) => {
        if (result.isConfirmed) {
      this.medidasService.eliminarMedida(id).subscribe({
                     next: () => {
                 Swal.fire('Eliminado', 'El cliente ha sido eliminado exitosamente.', 'success');
                 this.filtrarMedidas; // 🔥 Refresca la tabla si tienes un método para recargar
               },
               error: (err) => {
                 Swal.fire('Error', 'No se pudo eliminar el cliente.', 'error');
               }
             });
            
      }
      
    }

  )}

  
}

    
