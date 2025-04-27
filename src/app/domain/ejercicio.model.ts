import { CategoriaEjercicio } from "./categoriaejercicio.model";

export interface Ejercicio {
    idEjercicio: number;
    nombreEjercicio: string;
    categoriaEjercicio : CategoriaEjercicio[];
  }
  
