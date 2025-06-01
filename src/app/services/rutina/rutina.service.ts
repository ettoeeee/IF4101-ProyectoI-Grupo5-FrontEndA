// src/app/services/rutina/rutina.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Rutina } from '@app/domain/rutina.model';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RutinaService {
  private apiUrl = `${environment.apiBaseUrl}/clientes`;
  constructor(private http: HttpClient) { }
   private apiUrl2 = 'http://localhost:8080/bulk-gym/api/rutinas/recientes';
  

  /** GET /api/clientes/{id}/rutinas */
  obtenerPorCliente(idCliente: number): Observable<Rutina[]> {
    return this.http.get<Rutina[]>(`${this.apiUrl}${idCliente}/rutinas`);
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



}