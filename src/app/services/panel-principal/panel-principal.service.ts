import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment'; // ⬅️ Esto te faltó importar arriba

@Injectable({
  providedIn: 'root'
})
export class PanelPrincipalService {
  private baseUrl = `${environment.apiBaseUrl}/clientes`;  // ✅ Unificado bien

  constructor(private http: HttpClient) {}

  obtenerCantidadClientes(): Observable<{ cantidadClientes: number }> {
    return this.http.get<{ cantidadClientes: number }>(`${this.baseUrl}/cantidad`);
  }

  obtenerClientesRecientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/recientes`);
  }

  obtenerCantidadClientesActivos(): Observable<{ clientesActivos: number }> {
    return this.http.get<{ clientesActivos: number }>(`${this.baseUrl}/cantidad/activos`);
  }
  
  obtenerCantidadClientesInactivos(): Observable<{ clientesInactivos: number }> {
    return this.http.get<{ clientesInactivos: number }>(`${this.baseUrl}/cantidad/inactivos`);
  }
  obtenerCantidadEjercicios(): Observable<{ cantidadEjercicios: number }> {
  return this.http.get<{ cantidadEjercicios: number }>(`${environment.apiBaseUrl}/ejercicios/cantidad`);
}


obtenerCantidadCategorias(): Observable<{ cantidadCategorias: number }> {
  return this.http.get<{ cantidadCategorias: number }>(`${environment.apiBaseUrl}/ejercicios/categorias/cantidad`);
}

}


