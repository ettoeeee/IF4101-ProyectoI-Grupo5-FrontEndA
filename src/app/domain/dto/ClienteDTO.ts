export interface ClienteDTO {
  idPersona: number;
  nombre: string;
  apellidos: string;
  sexo: string; // char en Java, string de 1 carácter en TS
  telefono: string;
  correoElectronico: string;
  imagenRuta?: string;
  direccion?: string;
  nombreContactoEmergencia?: string;
  telContactoEmergencia?: string;
  activo: boolean;
  //fechaNacimiento: string; // normalmente se usa string ISO en frontend
}
