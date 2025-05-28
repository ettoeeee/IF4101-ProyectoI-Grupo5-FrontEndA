import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemRutinaMedida } from '@app/domain/item-rutina-medida.model';
import { ItemRutinaMedidasService } from '@app/services/itemRutinaMedida/item-rutina-medidas.service';
import { MedidaCorporal } from '@app/domain/medidaCorporal.model';
import { MedidasCorporalesService } from '@app/services/medidaCorporal/medidas-corporales.service';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-item-rutina-medidas',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModalModule],
  templateUrl: './item-rutina-medidas.component.html',
  styleUrls: ['./item-rutina-medidas.component.css']
})
export class ItemRutinaMedidasComponent implements OnInit {
  medidasDisponibles: MedidaCorporal[] = [];
  medidasFiltradas: MedidaCorporal[] = [];
  rutina: ItemRutinaMedida[] = [];
  medidaSeleccionada: MedidaCorporal | null = null;
  valorMedida: number | null = null;
  itemAEditar: ItemRutinaMedida | null = null;
  nuevoValor: number | null = null;

  constructor(
    private medidaService: ItemRutinaMedidasService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.medidaService.obtenerTodas().subscribe(data => {
      this.medidasDisponibles = data;
      this.medidasFiltradas = [...data];
    });
  }

  agregarMedida() {
    if (this.medidaSeleccionada && this.valorMedida && this.valorMedida > 0) {
      const existe = this.rutina.find(i => i.medidaCorporal.codMedida === this.medidaSeleccionada?.codMedida);
      
      if (!existe) {
        this.rutina.push({
          medidaCorporal: this.medidaSeleccionada,
          valorMedida: this.valorMedida
        });
        
        // Actualizar las medidas disponibles
        this.medidasFiltradas = this.medidasDisponibles.filter(
          m => !this.rutina.some(item => item.medidaCorporal.codMedida === m.codMedida)
        );
        
        // Resetear selección
        this.medidaSeleccionada = null;
        this.valorMedida = null;
      }
    }
  }

  abrirModalEliminar(content: any, item: ItemRutinaMedida) {
    this.itemAEditar = item;
    this.modalService.open(content, { centered: true });
  }

  eliminarMedida() {
    if (this.itemAEditar) {
      this.rutina = this.rutina.filter(i => i.medidaCorporal.codMedida !== this.itemAEditar?.medidaCorporal.codMedida);
      
      // Actualizar las medidas disponibles
      this.medidasFiltradas = this.medidasDisponibles.filter(
        m => !this.rutina.some(item => item.medidaCorporal.codMedida === m.codMedida)
      );
      
      this.modalService.dismissAll();
      this.itemAEditar = null;
    }
  }

  abrirModalEditar(content: any, item: ItemRutinaMedida) {
    this.itemAEditar = item;
    this.nuevoValor = item.valorMedida;
    this.modalService.open(content, { centered: true });
  }

  actualizarMedida() {
    if (this.itemAEditar && this.nuevoValor && this.nuevoValor > 0) {
      const index = this.rutina.findIndex(i => i.medidaCorporal.codMedida === this.itemAEditar?.medidaCorporal.codMedida);
      if (index !== -1) {
        this.rutina[index].valorMedida = this.nuevoValor;
      }
      this.modalService.dismissAll();
      this.itemAEditar = null;
      this.nuevoValor = null;
    }
  }

  validarNumero(item: ItemRutinaMedida): boolean {
    return item.valorMedida == null || isNaN(item.valorMedida) || item.valorMedida <= 0;
  }
}