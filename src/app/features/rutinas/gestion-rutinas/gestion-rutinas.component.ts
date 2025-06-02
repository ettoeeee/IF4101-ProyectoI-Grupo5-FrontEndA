import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RutinaService } from '@app/services/rutina/rutina.service';
import { RutinaCompletaDTO } from '@app/domain/dto/RutinaCompletaDTO';
import { ClienteService } from '@app/services/cliente/cliente.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-gestion-rutinas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-rutinas.component.html',
  styleUrls: ['./gestion-rutinas.component.css']
})
export class GestionRutinasComponent implements OnInit {
  filtro: string = '';
  rutinas: RutinaCompletaDTO[] = [];
  rutinasFiltradas: RutinaCompletaDTO[] = [];
  rutinaEnEdicion: RutinaCompletaDTO | null = null;

  constructor(
    private router: Router,
    private rutinaService: RutinaService,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.clienteService.obtenerTodos().subscribe({
      next: (clientes) => {
        const observables = clientes.map(c => this.rutinaService.obtenerPorCliente(c.idCliente!));

        forkJoin(observables).subscribe({
          next: (listasDeRutinas) => {
            this.rutinas = listasDeRutinas.flatMap((rutinasDeUnCliente, index) => {
            const cliente = clientes[index];
              return rutinasDeUnCliente.map(rutina => ({
             ...rutina,
                cliente: cliente
            }));
            });

            this.rutinasFiltradas = this.rutinas;
          },
          error: (err) => console.error('Error al cargar rutinas de clientes', err)
        });
      },
      error: (err) => console.error('Error al cargar clientes', err)
    });
  }

  irACrearRutina(): void {
    this.router.navigate(['/rutinas/nueva']);
  }

  ngOnChanges(): void {
    this.aplicarFiltro();
  }

  aplicarFiltro(): void {
    const filtroLower = this.filtro.toLowerCase();
    this.rutinasFiltradas = this.rutinas.filter(rutina =>
      rutina.cliente?.nombre?.toLowerCase().includes(filtroLower) ||
      rutina.objetivo?.toLowerCase().includes(filtroLower) ||
      rutina.idInstructor?.toString().includes(filtroLower)
    );
  }

  editarRutina(rutina: RutinaCompletaDTO): void {
    const idCliente = rutina.cliente?.idCliente;
    const idRutina = rutina.idRutina;

    if (idCliente && idRutina) {
      this.router.navigate([`/clientes/${idCliente}/rutinas/${idRutina}/editar`]);
    } else {
      console.error('Cliente o rutina no definidos');
    }
  }

  guardarEdicion(): void {
    if (!this.rutinaEnEdicion) return;

    this.rutinaService.update(this.rutinaEnEdicion).subscribe({
      next: (rutinaActualizada) => {
        const index = this.rutinas.findIndex(r => r.idRutina === rutinaActualizada.idRutina);
        if (index !== -1) {
          this.rutinas[index] = rutinaActualizada;
          this.aplicarFiltro();
        }
        this.rutinaEnEdicion = null;
        alert('Rutina actualizada con éxito');
      },
      error: (err) => {
        console.error('Error al actualizar rutina', err);
        alert('Error al actualizar rutina');
      }
    });
  }

  cancelarEdicion(): void {
    this.rutinaEnEdicion = null;
  }

  eliminarRutina(rutina: RutinaCompletaDTO): void {
    const confirmacion = confirm(`¿Seguro que deseas eliminar la rutina de ${rutina.cliente?.nombre}?`);

    if (confirmacion && rutina.idRutina && rutina.cliente?.idCliente) {
      this.rutinaService.delete(rutina.cliente.idCliente, rutina.idRutina).subscribe({
        next: () => {
          this.rutinas = this.rutinas.filter(r => r.idRutina !== rutina.idRutina);
          this.aplicarFiltro();
          alert('Rutina eliminada exitosamente');
        },
        error: (err) => {
          console.error(' Error al eliminar rutina', err);
          alert('Ocurrió un error al eliminar la rutina');
        }
      });
    }
  }
    descargarPDF(idRutina: number, idCliente: number): void {
    this.rutinaService
      .descargarPdfParaCliente(idCliente, idRutina)
      .subscribe({
        next: (blob: Blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `rutina_${idRutina}.pdf`;
          a.click();
          window.URL.revokeObjectURL(url);
        },
        error: (err: any) => {
          console.error('Error descargando PDF:', err);
          alert('Ocurrió un error al descargar el PDF.');
        }
      });
  }

  volverAlPanel(): void {
  this.router.navigate(['/instructor']);
}

}
