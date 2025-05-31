import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClienteSeleccionado {
  private _clienteId$ = new BehaviorSubject<number | null>(null);
  readonly clienteId$: Observable<number | null> = this._clienteId$.asObservable();

  setClienteId(id: number) {
    this._clienteId$.next(id);
  }
}
