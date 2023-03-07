import {GarageDTO} from './garagedto';

export class VehiculoDTO {
  matricula: string;
  nombre?: string;
  tipo?: string;
  alto?: number;
  ancho?: number;
  profundidad?: number;
  garage?: GarageDTO;
  fechaAsignacionGarage?: Date;

  constructor(
    matricula: string,
    nombre?: string,
    tipo?: string,
    alto?: number,
    ancho?: number,
    profundidad?: number,
    garage?: GarageDTO,
    fechaAsignacionGarage?: Date
  ) {
    this.matricula = matricula;
    this.nombre = nombre;
    this.tipo = tipo;
    this.alto = alto;
    this.ancho = ancho;
    this.profundidad = profundidad;
    this.garage = garage;
    this.fechaAsignacionGarage = fechaAsignacionGarage;
  }
}
