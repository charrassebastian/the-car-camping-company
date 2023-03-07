export class EmpleadoDTO {
  codigo: number;
  nombre: string;
  password: string;
  direccion?: string;
  telefono?: string;
  especialidad?: string;

  constructor(
    codigo: number,
    nombre: string,
    password: string,
    direccion?: string,
    telefono?: string,
    especialidad?: string,
  ) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.password = password;
    this.direccion = direccion;
    this.telefono = telefono;
    this.especialidad = especialidad;
  }
}
