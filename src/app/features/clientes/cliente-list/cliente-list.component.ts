import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from '../../../domain/cliente.model';
import { ClienteService } from '@app/services/cliente/cliente.service';  '../../services/cliente.service';
import { ClienteInsertReactiveComponent } from '../cliente-insert-reactive/cliente-insert-reactive.component';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ClienteInsertReactiveComponent],
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
  clientes: Cliente[] = [];
  filtro = '';
  clienteSeleccionado?: Cliente;
  mostrarModal = false;

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.clienteService.obtenerClientes().subscribe({
      next: (lista) => this.clientes = lista,
      error: (err) => console.error('Error cargando clientes', err)
    });
  }

  abrirModal(cliente?: Cliente): void {
    this.clienteSeleccionado = cliente;
    this.mostrarModal = true;
  }
  
  cerrarModal(): void {
    this.mostrarModal = false;
    this.clienteSeleccionado = undefined;
    this.cargarClientes();
  }

  // 🔥 Esta función es para filtrar clientes en la tabla
filtrarClientes(): Cliente[] {
  const filtroNormalizado = this.filtro.toLowerCase();
  return this.clientes.filter(c =>
    (c.nombre?.toLowerCase().includes(filtroNormalizado) ||
     c.apellidos?.toLowerCase().includes(filtroNormalizado) ||
     c.telefono?.includes(filtroNormalizado) ||
     c.correoElectronico?.toLowerCase().includes(filtroNormalizado) ||
     c.direccion?.toLowerCase().includes(filtroNormalizado) ||
     c.nombreContactoEmergencia?.toLowerCase().includes(filtroNormalizado) ||
     c.telContactoEmergencia?.includes(filtroNormalizado) ||
     String(c.idCliente).includes(filtroNormalizado) || // 🔥 También busca por ID
     (c.activo ? 'activo' : 'inactivo').includes(filtroNormalizado)) // 🔥 También busca por estado
  );
}


eliminarCliente(idCliente: number): void {
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
      // Si confirma, entonces sí se elimina
      this.clienteService.eliminarCliente(idCliente).subscribe({
        next: () => {
          Swal.fire('Eliminado', 'El cliente ha sido eliminado exitosamente.', 'success');
          this.cargarClientes(); // 🔥 Refresca la tabla si tienes un método para recargar
        },
        error: (err) => {
          Swal.fire('Error', 'No se pudo eliminar el cliente.', 'error');
        }
      });
    }
  });
}

  
}
