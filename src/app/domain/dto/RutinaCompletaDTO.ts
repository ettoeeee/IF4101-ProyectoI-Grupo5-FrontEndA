import { ClienteDTO } from "./ClienteDTO";

export interface RutinaCompletaDTO {
  idRutina: number;
  idInstructor: number;
  horario: string;
  objetivo: string;
  lesiones: string;
  padecimientos: string;
  fechaCreacion: string; // ISO format
  fechaRenovacion: string;
  medidas: ItemRutinaMedidaDTO[];
  ejercicios: ItemRutinaEjercicioDTO[];

  cliente: ClienteDTO;
}

export interface ItemRutinaMedidaDTO {
  idMedidaCorporal: number;
  valorMedida: number;
  fechaMedicion: string;
}

export interface ItemRutinaEjercicioDTO {
  idEjercicio: number;
  series: number;
  repeticiones: number;
  equipo: string;
}
