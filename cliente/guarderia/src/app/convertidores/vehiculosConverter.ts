import {Injectable} from '@angular/core';
import {VehiculoDTO} from '../dto/vehiculodto';
import {GaragesConverter} from './garagesConverter';

@Injectable({
  providedIn: 'root',
})
export class VehiculosConverter {
  constructor(private garagesConverter: GaragesConverter) {
  }

  convertirVehiculo(vehiculoModel: any): VehiculoDTO {
    let fechaAsignacionGarage: Date | undefined | null = vehiculoModel.fechaAsignacionGarage;
    if (fechaAsignacionGarage !== undefined && fechaAsignacionGarage !== null) {
      fechaAsignacionGarage = new Date(fechaAsignacionGarage);
      fechaAsignacionGarage.setMinutes(
        fechaAsignacionGarage.getMinutes() +
        fechaAsignacionGarage.getTimezoneOffset()
      );
    } else {
      fechaAsignacionGarage = undefined;
    }
    return new VehiculoDTO(
      vehiculoModel.matricula,
      vehiculoModel.nombre,
      vehiculoModel.tipo,
      vehiculoModel.alto,
      vehiculoModel.ancho,
      vehiculoModel.profundidad,
      vehiculoModel.garage != undefined ? this.garagesConverter.convertirGarage(vehiculoModel.garage) : undefined,
      fechaAsignacionGarage
    );
  }

  convertirVehiculos(vehiculosModel: any): VehiculoDTO[] {
    let vehiculos: VehiculoDTO[];
    vehiculos = [];
    if (vehiculosModel._embedded && vehiculosModel._embedded.vehiculoList) {
      for (let vehiculoModel of vehiculosModel._embedded.vehiculoList) {
        let vehiculo: VehiculoDTO;
        vehiculo = this.convertirVehiculo(vehiculoModel);
        vehiculos.push(vehiculo);
      }
    }
    return vehiculos;
  }

  convertirVehiculosAsociados(vehiculosModel: any): VehiculoDTO[] {
    let vehiculos: VehiculoDTO[] = [];
    for (let vehiculoModel of vehiculosModel) {
      let vehiculo: VehiculoDTO = this.convertirVehiculo(vehiculoModel);
      vehiculos.push(vehiculo);
    }
    return vehiculos;
  }
}
