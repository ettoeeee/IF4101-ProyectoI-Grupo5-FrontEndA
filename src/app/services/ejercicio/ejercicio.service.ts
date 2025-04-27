import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ejercicio } from '../../domain/ejercicio.model';

@Injectable({
  providedIn: 'root'
})
export class EjercicioService {
  private apiUrl = 'http://localhost:8080/bulk-gym/api/ejercicios'; // Ajusta si cambias el puerto/backend

  constructor(private http: HttpClient) {}

  obtenerEjercicios(): Observable<Ejercicio[]> {
    return this.http.get<Ejercicio[]>(this.apiUrl);
  }

  crearEjercicio(ejercicio: Ejercicio): Observable<any> {
    return this.http.post<any>(this.apiUrl, ejercicio);
  }

  actualizarEjercicio(id: number, ejercicio: Ejercicio): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, ejercicio);
  }

  eliminarEjercicio(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  obtenerEjercicioPorId(id: number): Observable<Ejercicio> {
    return this.http.get<Ejercicio>(`${this.apiUrl}/${id}`);
  }
}
