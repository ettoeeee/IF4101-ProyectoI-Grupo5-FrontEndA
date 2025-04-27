export interface Cliente {
    idCliente?: number;
    idPersona: number;
    nombre: string;
    apellidos: string;
    fechaNacimiento: Date | string;
    sexo: string;
    telefono: string;
    correoElectronico: string;
    imagenRuta?: string;
    direccion?: string;
    nombreContactoEmergencia?: string;
    telContactoEmergencia?: string;
    activo: boolean;
  }