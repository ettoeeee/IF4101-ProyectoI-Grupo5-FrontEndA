import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Ejercicio } from '@app/domain/ejercicio.model'; // Ajusta el path si lo tienes en otra carpeta

@Injectable({
  providedIn: 'root'
})
export class EjercicioService {

  private apiUrl = `${environment.apiBaseUrl}/ejercicios`; // solo /ejercicios

  constructor(private http: HttpClient) { }

  listarEjercicios(): Observable<Ejercicio[]> {
    return this.http.get<Ejercicio[]>(this.apiUrl);
  }

  insertarEjercicio(ejercicio: Ejercicio): Observable<any> {
    return this.http.post(this.apiUrl, ejercicio);
  }

  actualizarEjercicio(id: number, ejercicio: Ejercicio): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, ejercicio);
  }

  eliminarEjercicio(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getPorId(id: number) {
  return this.http.get<Ejercicio>(`${environment.apiBaseUrl}/ejercicios/${id}`);
}

}
