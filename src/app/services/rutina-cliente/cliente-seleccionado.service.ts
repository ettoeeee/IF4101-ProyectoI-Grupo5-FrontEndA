import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClienteSeleccionado {
  private _clienteId$ = new BehaviorSubject<number | null>(null);
  /** Observable al que se suscribe RutinasPorClienteComponent */
  readonly clienteId$: Observable<number | null> = this._clienteId$.asObservable();

  /** Llamar antes de navegar a /rutinas */
  setClienteId(id: number) {
    this._clienteId$.next(id);
  }
}
