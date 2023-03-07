import {Injectable} from '@angular/core';
import {GarageDTO} from '../dto/garagedto';

@Injectable({
  providedIn: 'root',
})
export class GaragesConverter {
  convertirGarage(garageModel: any): GarageDTO {
    let fechaCompraGarage: Date | undefined | null = garageModel.fechaCompraGarage;
    if (fechaCompraGarage !== undefined && fechaCompraGarage !== null) {
      fechaCompraGarage = new Date(fechaCompraGarage);
      fechaCompraGarage.setMinutes(
        fechaCompraGarage.getMinutes() + fechaCompraGarage.getTimezoneOffset()
      );
    } else {
      fechaCompraGarage = undefined;
    }

    return new GarageDTO(
      garageModel.numeroGarage,
      garageModel.lecturaContadorLuz,
      garageModel.clienteServiciosMantenimiento,
      fechaCompraGarage
    );
  }

  convertirGarages(garagesModel: any): GarageDTO[] {
    let garages: GarageDTO[];
    garages = [];
    if (garagesModel._embedded && garagesModel._embedded.garageList) {
      for (let garageModel of garagesModel._embedded.garageList) {
        let garage: GarageDTO;
        garage = this.convertirGarage(garageModel);
        garages.push(garage);
      }
    }
    return garages;
  }

  convertirGaragesAsociados(garagesModel: any): GarageDTO[] {
    let garages: GarageDTO[] = [];
    for (let garageModel of garagesModel) {
      let garage: GarageDTO = this.convertirGarage(garageModel);
      garages.push(garage);
    }
    return garages;
  }
}
