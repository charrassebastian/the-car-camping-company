import { Component } from '@angular/core';
import { EmpleadoDTO } from '../dto/empleadodto';
import { GarageDTO } from '../dto/garagedto';
import { SocioDTO } from '../dto/sociodto';
import { VehiculoDTO } from '../dto/vehiculodto';
import { ZonaDTO } from '../dto/zonadto';
import { ErrorBorrarEntidadAsociacionVigenteService } from '../servicios/error/error-borrar-entidad-asociacion-vigente.service';

@Component({
  selector: 'app-error-borrar-entidad-asociacion-vigente',
  templateUrl: './error-borrar-entidad-asociacion-vigente.component.html',
  styleUrls: ['./error-borrar-entidad-asociacion-vigente.component.css'],
})
export class ErrorBorrarEntidadAsociacionVigenteComponent {
  empleados?: EmpleadoDTO[];
  garages?: GarageDTO[];
  socios?: SocioDTO[];
  vehiculos?: VehiculoDTO[];
  zonas?: ZonaDTO[];
  constructor(private service: ErrorBorrarEntidadAsociacionVigenteService) {
    this.empleados = service.getEmpleados();
    this.garages = service.getGarages();
    this.socios = service.getSocios();
    this.vehiculos = service.getVehiculos();
    this.zonas = service.getZonas();
  }
}
