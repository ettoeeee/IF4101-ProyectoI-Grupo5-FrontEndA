import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MedidaCorporal } from '../../domain/medidaCorporal.model';


@Injectable({
  providedIn: 'root'
})
export class MedidasCorporalesService {
  private apiUrl = 'http://localhost:8080/bulk-gym/api/medidas'; 


  constructor(private http: HttpClient) {}


  obtenerMedidas(): Observable<MedidaCorporal[]> {
    return this.http.get<MedidaCorporal[]>(this.apiUrl);
  }


  crearMedida(medida: MedidaCorporal): Observable<MedidaCorporal> {
    return this.http.post<MedidaCorporal>(this.apiUrl, medida);
  }


  actualizarMedida(id: number, medida: MedidaCorporal): Observable<MedidaCorporal> {
    return this.http.put<MedidaCorporal>(`${this.apiUrl}/${id}`, medida);
  }


  eliminarMedida(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  obtenerMedidaPorId(id: number): Observable<MedidaCorporal> {
    return this.http.get<MedidaCorporal>(`${this.apiUrl}/${id}`);
  }
}


