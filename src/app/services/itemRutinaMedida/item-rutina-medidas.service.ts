import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MedidaCorporal } from '@app/domain/medidaCorporal.model';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class ItemRutinaMedidasService {
  private apiUrl = `${environment.apiBaseUrl}/itemMedidas/medidasItem`;

  constructor(private http: HttpClient) {}

  obtenerTodas(): Observable<MedidaCorporal[]> {
    return this.http.get<MedidaCorporal[]>(this.apiUrl);
  }
}
