import {Injectable} from '@angular/core';
import {EmpleadoDTO} from 'src/app/dto/empleadodto';
import {GarageDTO} from 'src/app/dto/garagedto';
import {SocioDTO} from 'src/app/dto/sociodto';
import {VehiculoDTO} from 'src/app/dto/vehiculodto';
import {ZonaDTO} from 'src/app/dto/zonadto';

@Injectable({
  providedIn: 'root',
})
export class ErrorBorrarEntidadAsociacionVigenteService {
  private empleados?: EmpleadoDTO[];
  private garages?: GarageDTO[];
  private socios?: SocioDTO[];
  private vehiculos?: VehiculoDTO[];
  private zonas?: ZonaDTO[];

  constructor() {
  }

  clear(): void {
    this.empleados = [];
    this.garages = [];
    this.socios = [];
    this.vehiculos = [];
    this.zonas = [];
  }

  getEmpleados(): EmpleadoDTO[] | undefined {
    return this.empleados;
  }

  getGarages(): GarageDTO[] | undefined {
    return this.garages;
  }

  getSocios(): SocioDTO[] | undefined {
    return this.socios;
  }

  getVehiculos(): VehiculoDTO[] | undefined {
    return this.vehiculos;
  }

  getZonas(): ZonaDTO[] | undefined {
    return this.zonas;
  }

  setEmpleados(empleados: EmpleadoDTO[]): void {
    this.empleados = empleados;
  }

  setGarages(garages: GarageDTO[]): void {
    this.garages = garages;
  }

  setSocios(socios: SocioDTO[]): void {
    this.socios = socios;
  }

  setVehiculos(vehiculos: VehiculoDTO[]): void {
    this.vehiculos = vehiculos;
  }

  setZonas(zonas: ZonaDTO[]): void {
    this.zonas = zonas;
  }
}
