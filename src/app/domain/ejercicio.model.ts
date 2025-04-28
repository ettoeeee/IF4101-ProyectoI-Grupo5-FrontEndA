import { CategoriaEjercicio } from './categoriaejercicio.model';
import { FotografiaEjercicio } from './fotografiaejercicio.model'; 

export interface Ejercicio {
    idEjercicio: number;
    nombreEjercicio: string;
    categoriaEjercicio: CategoriaEjercicio[];  // Lista de objetos CategoriaEjercicio
    fotografiasEjercicio: FotografiaEjercicio[];  // Lista de objetos FotografiaEjercicio
}

