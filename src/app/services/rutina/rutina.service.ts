// src/app/services/rutina/rutina.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rutina } from '@app/domain/rutina.model';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { RutinaCompletaDTO } from '@app/domain/dto/RutinaCompletaDTO';


@Injectable({ providedIn: 'root' })
export class RutinaService {
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

  getByCliente(idCliente: number): Observable<Rutina[]> {
    return this.http.get<Rutina[]>(`${this.apiUrl}/${idCliente}/rutinas`);
  }

  /** POST /api/clientes/{id}/rutinas */
  crearParaCliente(idCliente: number, rutina: Rutina): Observable<Rutina> {
    return this.http.post<Rutina>(
      `${this.apiUrl}/${idCliente}/rutinas`,
      rutina
    );
  }

  /** Llama al endpoint PDF que ya montaste */
  descargarPdf(idRutina: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/rutinas/${idRutina}/pdf`, {
      responseType: 'blob'
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
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

  /** Método para descargar el PDF de la rutina */
  getPdf(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/pdf`, {
      responseType: 'blob'
    });
  }
}
