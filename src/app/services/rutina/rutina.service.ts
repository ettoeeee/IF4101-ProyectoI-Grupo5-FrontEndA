// src/app/services/rutina/rutina.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Rutina } from '@app/domain/rutina.model';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

import { map } from 'rxjs/operators';

import { RutinaCompletaDTO } from '@app/domain/dto/RutinaCompletaDTO';


@Injectable({ providedIn: 'root' })
export class RutinaService {

  private apiUrl = `${environment.apiBaseUrl}/clientes`;
 

  constructor(private http: HttpClient) { }
   private apiUrl2 = 'http://localhost:8080/bulk-gym/api/rutinas/recientes';
  

  
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
      `${this.apiUrl}/${idCliente}/rutinas`,
      rutina
    );
  }

  /**
   * DELETE /api/clientes/{idCliente}/rutinas/{idRutina}
   */
  eliminarParaCliente(idCliente: number, idRutina: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${idCliente}/rutinas/${idRutina}`
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
      `${this.apiUrl}/${idCliente}/rutinas/${idRutina}/pdf`,
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

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /** Método para descargar el PDF de la rutina */
  getPdf(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/pdf`, {
      responseType: 'blob'
    });
  }


 getRutinasRecientes(fechaLimite: Date): Observable<any[]> {
    const fechaFormateada = fechaLimite.toISOString().split('T')[0]; // formato yyyy-MM-dd
    const params = new HttpParams().set('fechaLimite', fechaFormateada);

    // Llama a: http://localhost:8080/bulk-gym/api/rutinas/recientes?fechaLimite=yyyy-MM-dd
    return this.http.get<any[]>(`${this.apiUrl2}`, { params });
  }




  getPdfParaCliente(
    idCliente: number,
    idRutina: number
  ): Observable<Blob> {
    return this.descargarPdfParaCliente(idCliente, idRutina);
  }

 

}
