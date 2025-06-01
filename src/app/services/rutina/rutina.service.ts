// src/app/services/rutina/rutina.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rutina } from '@app/domain/rutina.model';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class RutinaService {

  private apiClientes = `${environment.apiBaseUrl}/clientes`;

  constructor(private http: HttpClient) { }

  /**
   * GET /api/clientes/{idCliente}/rutinas
   */
  obtenerPorCliente(idCliente: number): Observable<Rutina[]> {
    return this.http.get<Rutina[]>(
      `${this.apiClientes}/${idCliente}/rutinas`
    );
  }

  /**
   * alias de obtenerPorCliente
   */
  getByCliente(idCliente: number): Observable<Rutina[]> {
    return this.obtenerPorCliente(idCliente);
  }

  /**
   * POST /api/clientes/{idCliente}/rutinas
   */
  crearParaCliente(idCliente: number, rutina: Rutina): Observable<Rutina> {
    return this.http.post<Rutina>(
      `${this.apiClientes}/${idCliente}/rutinas`,
      rutina
    );
  }

  /**
   * DELETE /api/clientes/{idCliente}/rutinas/{idRutina}
   */
  eliminarParaCliente(idCliente: number, idRutina: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiClientes}/${idCliente}/rutinas/${idRutina}`
    );
  }

  /**
   * DESCARGA PDF: GET /api/clientes/{idCliente}/rutinas/{idRutina}/pdf
   */
  descargarPdfParaCliente(
    idCliente: number,
    idRutina: number
  ): Observable<Blob> {
    return this.http.get(
      `${this.apiClientes}/${idCliente}/rutinas/${idRutina}/pdf`,
      {
        responseType: 'blob',
      }
    );
  }

  getPdfParaCliente(
    idCliente: number,
    idRutina: number
  ): Observable<Blob> {
    return this.descargarPdfParaCliente(idCliente, idRutina);
  }

  getRutinasRecientes(fechaLimite: Date): Observable<Rutina[]> {
  return this.http.get<Rutina[]>(`${this.apiUrl}/recientes`, {
    params: {
      fechaLimite: fechaLimite.toISOString()
    }
  });
}
}
