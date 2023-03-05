import { EmpleadoDTO } from './empleadodto';
import { GarageDTO } from './garagedto';

export class ZonaDTO {
  letra: string;
  tipoVehiculo?: string;
  profundidadGarage?: number;
  anchoGarage?: number;
  garages?: GarageDTO[];

  constructor(
    letra: string,
    tipoVehiculo?: string,
    profundidadGarage?: number,
    anchoGarage?: number,
    garages?: GarageDTO[],
  ) {
    this.letra = letra;
    this.tipoVehiculo = tipoVehiculo;
    this.profundidadGarage = profundidadGarage;
    this.anchoGarage = anchoGarage;
    this.garages = garages;
  }
}
