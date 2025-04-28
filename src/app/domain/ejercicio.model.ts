import { CategoriaEjercicio } from './categoriaejercicio.model';
import { FotografiaEjercicio } from './fotografiaejercicio.model'; 

// Este es tu modelo principal para cargar ejercicios completos
export interface Ejercicio {
    idEjercicio: number;
    nombreEjercicio: string;
    categoriaEjercicio: CategoriaEjercicio[];  // Lista de objetos CategoriaEjercicio
    fotografiasEjercicio: FotografiaEjercicio[];  // Lista de objetos FotografiaEjercicio
}

// ESTE es el nuevo modelo solo para CREAR un ejercicio
export interface EjercicioCrearDTO {
    nombreEjercicio: string;
    equipo: string;
    series: number;
    repeticiones: number;
    idCategoria: number;
}
