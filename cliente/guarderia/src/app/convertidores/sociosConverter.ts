import { Injectable } from '@angular/core';
import { GarageDTO } from '../dto/garagedto';
import { SocioDTO } from '../dto/sociodto';
import { VehiculoDTO } from '../dto/vehiculodto';
import { GaragesConverter } from './garagesConverter';
import { VehiculosConverter } from './vehiculosConverter';

@Injectable({
  providedIn: 'root',
})
export class SociosConverter {
  constructor(
    private garagesConverter: GaragesConverter,
    private vehiculosConverter: VehiculosConverter
  ) {}
  convertirSocio(socioModel: any): SocioDTO {
    let ingreso: Date | undefined | null = socioModel.ingreso;
    if (ingreso !== undefined && ingreso !== null) {
      ingreso = new Date(ingreso);
      ingreso.setMinutes(ingreso.getMinutes() + ingreso.getTimezoneOffset());
    } else {
      ingreso = undefined;
    }
    return new SocioDTO(
      socioModel.dni,
      socioModel.nombre,
      socioModel.password,
      socioModel.direccion,
      socioModel.telefono,
      ingreso,
      socioModel.garages?.length ? this.garagesConverter.convertirGaragesAsociados(socioModel.garages) : undefined,
      socioModel.vehiculos?.length ? this.vehiculosConverter.convertirVehiculosAsociados(socioModel.vehiculos) : undefined
    );
  }

  convertirSocios(sociosModel: any): SocioDTO[] {
    let socios: SocioDTO[];
    socios = [];
    if (sociosModel._embedded && sociosModel._embedded.socioList) {
      for (let socioModel of sociosModel._embedded.socioList) {
        let socio: SocioDTO;
        socio = this.convertirSocio(socioModel);
        socios.push(socio);
      }
    }
    return socios;
  }
}
