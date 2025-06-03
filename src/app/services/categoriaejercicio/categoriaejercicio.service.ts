import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriaEjercicio } from '../../domain/categoriaejercicio.model';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaEjercicioService {
  private apiUrl = `${environment.apiBaseUrl}/categorias`;

  constructor(private http: HttpClient) {}

  obtenerCategorias(): Observable<CategoriaEjercicio[]> {
    return this.http.get<CategoriaEjercicio[]>(this.apiUrl);
  }

  obtenerCategoriaPorId(id: number): Observable<CategoriaEjercicio> {
    return this.http.get<CategoriaEjercicio>(`${this.apiUrl}/${id}`);
  }
  listarCategorias(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearCategoria(categoria: CategoriaEjercicio): Observable<CategoriaEjercicio> {
    return this.http.post<CategoriaEjercicio>(this.apiUrl, categoria);
  }
  
  actualizarCategoria(id: number, categoria: CategoriaEjercicio): Observable<CategoriaEjercicio> {
    return this.http.put<CategoriaEjercicio>(`${this.apiUrl}/${id}`, categoria);
  }
  
  eliminarCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


}
