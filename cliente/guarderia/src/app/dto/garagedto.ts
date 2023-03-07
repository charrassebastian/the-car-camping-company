export class GarageDTO {
  numeroGarage: number;
  lecturaContadorLuz?: number;
  clienteServiciosMantenimiento?: boolean;
  fechaCompraGarage?: Date;

  constructor(
    numeroGarage: number,
    lecturaContadorLuz?: number,
    clienteServiciosMantenimiento?: boolean,
    fechaCompraGarage?: Date
  ) {
    this.numeroGarage = numeroGarage;
    this.lecturaContadorLuz = lecturaContadorLuz;
    this.clienteServiciosMantenimiento = clienteServiciosMantenimiento;
    this.fechaCompraGarage = fechaCompraGarage;
  }
}
