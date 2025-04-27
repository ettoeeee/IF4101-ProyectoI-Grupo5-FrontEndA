import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriaEjercicio } from '../../domain/categoriaejercicio.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaEjercicioService {
  private apiUrl = 'http://localhost:8080/bulk-gym/api/categorias'; // Ajusta si el endpoint es diferente

  constructor(private http: HttpClient) {}

  obtenerCategorias(): Observable<CategoriaEjercicio[]> {
    return this.http.get<CategoriaEjercicio[]>(this.apiUrl);
  }

  obtenerCategoriaPorId(id: number): Observable<CategoriaEjercicio> {
    return this.http.get<CategoriaEjercicio>(`${this.apiUrl}/${id}`);
  }
}
