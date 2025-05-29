<<<<<<< HEAD
export interface Rutina {
    idRutina: number;
    idCliente: number;
    fechaCreacion: Date;     
    fechaRenovacion: Date;   
    horario: string;
    objetivo: string;
    lesiones: string;
    padecimientos: string;
  }
  
=======
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
>>>>>>> 5a3fc9d54937bce02ac3d074344493e6e8115ee0
