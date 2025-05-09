// src/app/domain/rutina.model.ts

import { Cliente } from './cliente.model';
import { ItemRutinaEjercicio } from './item-rutina-ejercicio.model';
import { ItemRutinaMedida } from './item-rutina-medida.model';

export interface RutinaPayload {
  clienteId: number;
  fechaCreacion: string;    // ISO date string, e.g. "2025-05-01"
  fechaRenovacion: string;  // ISO date string
  objetivo: string;
  lesiones?: string;
  enfermedades?: string;
  ejercicios: ItemRutinaEjercicio[];
  medidas: ItemRutinaMedida[];
}

export interface Rutina extends RutinaPayload {
  cliente: any;
  idRutina: number;
}
