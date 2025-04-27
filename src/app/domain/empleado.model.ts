export interface Empleado {
  idEmpleado: number;
  idPersona: number;

  // Persona:
  nombre: string;
  apellidos: string;
  fechaNacimiento: string;       // YYYY-MM-DD
  sexo: 'M' | 'F' | 'O';         // Masculino, femenino, otro
  telefono: string;
  correoElectronico: string;
  imagenRuta?: string;
  direccion: string;
  nombreContactoEmergencia: string;
  telContactoEmergencia: string;

  // Empleado
  rolEmpleado: string;
}
