import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MedidaCorporal } from '@app/domain/medidaCorporal.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ItemRutinaMedidasService {
  private apiUrl = 'https://9497-163-178-107-104.ngrok-free.app/bulk-gym/api/itemMedidas/medidasItem';

  constructor(private http: HttpClient) {}

  obtenerTodas(): Observable<MedidaCorporal[]> {
    return this.http.get<MedidaCorporal[]>(this.apiUrl);
  }
}
