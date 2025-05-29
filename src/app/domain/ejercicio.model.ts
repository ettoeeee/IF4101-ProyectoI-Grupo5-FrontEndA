export interface Ejercicio {
  idEjercicio?: number;
  nombreEjercicio: string;
  imagen?: string;
  categoriaEjercicio?: {
    idCategoriaEjercicio: number;
    nombreCategoria: string;
  }[];  
}
