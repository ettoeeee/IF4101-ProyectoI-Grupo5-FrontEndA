import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { ItemRutinaEjercicio } from '@app/domain/item-rutina-ejercicio.model';

@Injectable({
  providedIn: 'root'
})
export class ItemRutinaEjercicioService {

  private apiUrl = `${environment.apiBaseUrl}/itemEjercicios`;

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<ItemRutinaEjercicio[]> {
    return this.http.get<ItemRutinaEjercicio[]>(this.apiUrl);
  }

  buscarPorId(idRutina: number, idEjercicio: number): Observable<ItemRutinaEjercicio> {
    const params = new HttpParams()
      .set('idRutina', idRutina.toString())
      .set('idEjercicio', idEjercicio.toString());

    return this.http.get<ItemRutinaEjercicio>(`${this.apiUrl}/buscar`, { params });
  }

  insertar(item: ItemRutinaEjercicio): Observable<any> {
    return this.http.post(`${this.apiUrl}`, item);
  }

  modificar(idRutina: number, idEjercicio: number, series: number, repeticiones: number, equipo: string): Observable<any> {
    const params = new HttpParams()
      .set('idRutina', idRutina.toString())
      .set('idEjercicio', idEjercicio.toString());

    const body = {
      series,
      repeticiones,
      equipo
    };

    return this.http.put(`${this.apiUrl}`, body, { params });
  }

  eliminar(idRutina: number, idEjercicio: number): Observable<any> {
    const params = new HttpParams()
      .set('idRutina', idRutina.toString())
      .set('idEjercicio', idEjercicio.toString());

    return this.http.delete(`${this.apiUrl}`, { params });
  }

  contarItems(): Observable<{ cantidadItemRutinaEjercicio: number }> {
    return this.http.get<{ cantidadItemRutinaEjercicio: number }>(`${this.apiUrl}/cantidad`);
  }
}
