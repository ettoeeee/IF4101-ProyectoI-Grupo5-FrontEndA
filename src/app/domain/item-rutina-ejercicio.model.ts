// src/app/domain/item-rutina-ejercicio.model.ts

import { Ejercicio } from './ejercicio.model';

export interface ItemRutinaEjercicio {
  ejercicio: Ejercicio;
  seriesEjercicio: number;
  repeticionesEjercicio: number;
  equipoBiomecanico?: number;
}
