import { GarageDTO } from './garagedto';
import { VehiculoDTO } from './vehiculodto';

export class SocioDTO {
  dni: number;
  nombre: string;
  password: string;
  direccion?: string;
  telefono?: string;
  ingreso?: Date;
  garages?: GarageDTO[];
  vehiculos?: VehiculoDTO[];

  constructor(
    dni: number,
    nombre: string,
    password: string,
    direccion?: string,
    telefono?: string,
    ingreso?: Date,
    garages?: GarageDTO[],
    vehiculos?: VehiculoDTO[]
  ) {
    this.dni = dni;
    this.nombre = nombre;
    this.password = password;
    this.direccion = direccion;
    this.telefono = telefono;
    this.ingreso = ingreso;
    this.garages = garages;
    this.vehiculos = vehiculos;
  }
}
