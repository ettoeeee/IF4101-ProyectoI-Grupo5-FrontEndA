// src/app/services/rutina/rutina.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rutina, RutinaPayload } from '@app/domain/rutina.model';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class RutinaService {
  private apiUrl = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) { }

  /** GET /api/clientes/{id}/rutinas */
  obtenerPorCliente(idCliente: number): Observable<Rutina[]> {
    return this.http.get<Rutina[]>(`${this.apiUrl}/clientes/${idCliente}/rutinas`);
  }

  /** Llama al endpoint PDF que ya montaste */
  descargarPdf(idRutina: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/rutinas/${idRutina}/pdf`, {
      responseType: 'blob'
    });
  }

  /** Create devuelve la nueva rutina (con su id) */
  create(data: RutinaPayload): Observable<Rutina> {
    return this.http.post<Rutina>(this.apiUrl, data);
  }

  getByCliente(idCliente: number): Observable<Rutina[]> {
    return this.http.get<Rutina[]>(`${this.apiUrl}/clientes/${idCliente}/rutinas`);
  }

  update(id: number, data: RutinaPayload): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, data);
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
}
