// src/app/domain/item-rutina-medida.model.ts

import { MedidaCorporal } from './medidaCorporal.model';

export interface ItemRutinaMedida {
  medidaCorporal: MedidaCorporal;
  valorMedida: number;
}
