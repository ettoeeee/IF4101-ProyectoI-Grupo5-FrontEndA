import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FotografiaEjercicio } from '../../domain/fotografiaejercicio.model'; // Si no la tienes, importa el modelo de la fotografía.
import { CategoriaEjercicio } from '@app/domain/categoriaejercicio.model';
import { Ejercicio, EjercicioCrearDTO } from '@app/domain/ejercicio.model';

@Injectable({
  providedIn: 'root'
})
export class EjercicioService {
  private apiUrl = 'http://localhost:8080/bulk-gym/api/ejercicios'; // Endpoint para ejercicios
  private apiUrlCategorias = 'http://localhost:8080/bulk-gym/api/categorias'; // Endpoint para categorías
  private apiUrlFotos = 'http://localhost:8080/bulk-gym/api/fotografias'; // Endpoint para fotos de los ejercicios.

  constructor(private http: HttpClient) {}

  // Obtener todas las categorías
  obtenerCategorias(): Observable<CategoriaEjercicio[]> {
    return this.http.get<CategoriaEjercicio[]>(this.apiUrlCategorias);
  }

  // Obtener todos los ejercicios
  obtenerEjercicios(): Observable<Ejercicio[]> {
    return this.http.get<Ejercicio[]>(this.apiUrl);
  }

  // Crear un ejercicio nuevo (sin fotos)
  crearEjercicio(ejercicio: EjercicioCrearDTO): Observable<any> {
    return this.http.post<any>(this.apiUrl, ejercicio);
  }

  // Crear un ejercicio con fotos
  crearEjercicioConFotos(ejercicio: Ejercicio, formData: FormData): Observable<Ejercicio> {
    return this.http.post<Ejercicio>(this.apiUrl, formData);
  }

  // Subir una foto para un ejercicio

  subirFoto(idEjercicio: number, formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${idEjercicio}/fotografias`, formData);
  }
  

  // Actualizar un ejercicio existente (sin fotos)
  actualizarEjercicio(id: number, ejercicio: Ejercicio): Observable<Ejercicio> {
    return this.http.put<Ejercicio>(`${this.apiUrl}/${id}`, ejercicio);
  }

  // Actualizar un ejercicio con fotos
  actualizarEjercicioConFotos(id: number, ejercicio: Ejercicio, archivoFoto: File): Observable<Ejercicio> {
    const formData = new FormData();
    formData.append('ejercicio', JSON.stringify(ejercicio)); // Convertimos el objeto Ejercicio en string para enviarlo.
    formData.append('foto', archivoFoto, archivoFoto.name); // Adjuntamos la foto seleccionada.
    return this.http.put<Ejercicio>(`${this.apiUrl}/${id}`, formData);
  }

  // Eliminar un ejercicio
  eliminarEjercicio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
