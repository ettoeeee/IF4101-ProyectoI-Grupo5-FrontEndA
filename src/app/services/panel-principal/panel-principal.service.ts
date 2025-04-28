import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanelPrincipalService {
  private baseUrl = 'http://localhost:8080/bulk-gym/api/clientes';  // Tu base correcta

  constructor(private http: HttpClient) {}

  obtenerCantidadClientes(): Observable<{ cantidadClientes: number }> {
    return this.http.get<{ cantidadClientes: number }>(`${this.baseUrl}/cantidad`);
  }

  obtenerClientesRecientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/recientes`);
  }
}
