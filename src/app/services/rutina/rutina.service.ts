// src/app/services/rutina/rutina.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rutina } from '@app/domain/rutina.model';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { RutinaCompletaDTO } from '@app/domain/dto/RutinaCompletaDTO';

@Injectable({ providedIn: 'root' })
export class RutinaService {

  private apiClientes = `${environment.apiBaseUrl}/clientes`;
  private apiUrl = `${environment.apiBaseUrl}/clientes`;

  constructor(private http: HttpClient) { }

  
  obtenerPorCliente(idCliente: number): Observable<RutinaCompletaDTO[]> {
    return this.http.get<RutinaCompletaDTO[]>(`${environment.apiBaseUrl}/clientes/${idCliente}/rutinas`);
  }

  /** GET /api/clientes/{idCliente}/rutinas/{idRutina} */
  obtenerRutinaPorId(idCliente: number, idRutina: number): Observable<Rutina> {
    return this.http.get<Rutina>(`${this.apiUrl}/${idCliente}/rutinas/${idRutina}`);
  }

  obtenerTodas(): Observable<RutinaCompletaDTO[]> {
    return this.http.get<RutinaCompletaDTO[]>(`${environment.apiBaseUrl}/rutinas`);
  }
 
  /**
   * alias de obtenerPorCliente
   */
  getByCliente(idCliente: number): Observable<Rutina[]> {
    return this.http.get<Rutina[]>(`${this.apiUrl}/${idCliente}/rutinas`);
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


  update(rutina: RutinaCompletaDTO): Observable<RutinaCompletaDTO> {
    const idCliente = rutina.cliente?.idPersona;
    const idRutina = rutina.idRutina;

    if (!idCliente || !idRutina) {
      throw new Error('Cliente o ID de rutina faltante para actualizar.');
    }

    return this.http.put<RutinaCompletaDTO>(
      `${this.apiUrl}/${idCliente}/rutinas/${idRutina}`,
      rutina
    );
  }

  delete(idCliente: number, idRutina: number) {
  return this.http.delete(`${environment.apiBaseUrl}/clientes/${idCliente}/rutinas/${idRutina}`);
}


  /** Método para descargar el PDF de la rutina */
  getPdf(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/pdf`, {
      responseType: 'blob'
    });
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
  