import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '@app/domain/empleado.model';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

interface RespuestaMensaje { mensaje: string; }

@Injectable({ providedIn: 'root' })
export class EmpleadoService {
  private apiUrl = `${environment.apiBaseUrl}/empleados`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.apiUrl);
  }

  getById(id: number): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.apiUrl}/${id}`);
  }

  create(empleado: Empleado): Observable<void> {
    return this.http.post<void>(this.apiUrl, empleado);
  }

  update(id: number, empleado: Empleado): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, empleado);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

