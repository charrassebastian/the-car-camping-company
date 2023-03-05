import { Injectable } from '@angular/core';
import { ZonaDTO } from '../dto/zonadto';
import { GaragesConverter } from './garagesConverter';

@Injectable({
  providedIn: 'root',
})
export class ZonasConverter {
  constructor(private garagesConverter: GaragesConverter){}
  convertirZona(zonaModel: any): ZonaDTO {
    return new ZonaDTO(
      zonaModel.letra,
      zonaModel.tipoVehiculo,
      zonaModel.profundidadGarage,
      zonaModel.anchoGarage,
      zonaModel.garages?.length > 0 ? this.garagesConverter.convertirGaragesAsociados(zonaModel.garages) : undefined
    );
  }

  convertirZonas(zonasModel: any): ZonaDTO[] {
    let zonas: ZonaDTO[];
    zonas = [];
    if (zonasModel._embedded && zonasModel._embedded.zonaList) {
      for (let zonaModel of zonasModel._embedded.zonaList) {
        let zona: ZonaDTO;
        zona = this.convertirZona(zonaModel);
        zonas.push(zona);
      }
    }
    return zonas;
  }
}
