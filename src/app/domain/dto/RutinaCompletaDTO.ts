export interface RutinaCompletaDTO {
  idInstructor: number;
  horario: string;
  objetivo: string;
  lesiones: string;
  padecimientos: string;
  fechaCreacion: string; // ISO format
  fechaRenovacion: string;
  medidas: ItemRutinaMedidaDTO[];
  ejercicios: ItemRutinaEjercicioDTO[];
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
