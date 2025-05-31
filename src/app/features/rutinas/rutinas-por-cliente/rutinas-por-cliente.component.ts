import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { RutinaService } from '@app/services/rutina/rutina.service';
import { Rutina } from '@app/domain/rutina.model';
import { RutinaFormComponent } from '../rutina-form/rutina-form.component';
import { ClienteSeleccionado } from '@app/services/rutina-cliente/cliente-seleccionado.service';

@Component({
  selector: 'app-rutinas-por-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule, RutinaFormComponent],
  templateUrl: './rutinas-por-cliente.component.html',
  styleUrls: ['./rutinas-por-cliente.component.css']
})

export class RutinasPorClienteComponent implements OnInit {
  clienteId!: number;
  rutinas: Rutina[] = [];
  mostrarModal = false;
  rutinaSeleccionada?: Rutina;

  abrirModal(rutina?: Rutina) {
    this.rutinaSeleccionada = rutina;
    this.mostrarModal = true;
  }

  onGuardado() {
    // se emite al crear/editar
    this.mostrarModal = false;
    this.cargarRutinas();
  }

  constructor(
    private route: ActivatedRoute,
    private rutinaService: RutinaService,
    private selCli: ClienteSeleccionado
  ) { }

  ngOnInit() {
    this.clienteId = +this.route.snapshot.paramMap.get('clienteId')!;
    this.cargarRutinas();
  }

  cargarRutinas(): void {
    this.rutinaService
      .getByCliente(this.clienteId)
      .subscribe(r => this.rutinas = r);
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.rutinaSeleccionada = undefined;
    this.cargarRutinas();
  }

  eliminarRutina(id: number) {
    if (!confirm('¿Seguro que deseas eliminar esta rutina?')) return;
    this.rutinaService.delete(id).subscribe({
      next: () => this.cargarRutinas(),
      error: err => alert('Error al eliminar: ' + (err.error?.mensaje || err.message))
    });
  }

  generarPDF(id: number) {
    this.rutinaService.getPdf(id).subscribe({
      next: (blob: Blob) => {
        // crear un URL temporal y forzar la descarga
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `rutina_${id}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err: any) => {
        console.error('Error generando PDF', err);
      }
    });
  }
}
