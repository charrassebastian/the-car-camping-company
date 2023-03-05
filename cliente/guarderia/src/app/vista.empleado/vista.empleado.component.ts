import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadosConverter } from '../convertidores/empleadosConverter';
import { ZonasConverter } from '../convertidores/zonasConverter';
import { EmpleadoDTO } from '../dto/empleadodto';
import { ZonaDTO } from '../dto/zonadto';
import { EmpleadoService } from '../servicios/empleado/empleado.service';
import { LoginService } from '../servicios/login/login.service';

@Component({
  selector: 'app-vista-empleado',
  templateUrl: './vista.empleado.component.html',
  styleUrls: ['./vista.empleado.component.css'],
})
export class VistaEmpleadoComponent {
  empleado!: EmpleadoDTO;
  zonas?: ZonaDTO[];
  cantidadVehiculosEncargadosPorZona: any;
  loginService: LoginService
  constructor(
    private service: EmpleadoService,
    private converter: EmpleadosConverter,
    private route: ActivatedRoute,
    private zonaConverter: ZonasConverter,
    loginService: LoginService
  ) {
    this.loginService = loginService;
    this.getEmpleado();
    this.fetchZonas();
    this.fetchCantidadVehiculosZonas();
  }
  fetchCantidadVehiculosZonas(): void {
    this.service
      .getCantidadVehiculosAsignadosPorZona(
        Number(this.route.snapshot.paramMap.get('codigo'))
      )
      .subscribe((cantidades) => {
        this.cantidadVehiculosEncargadosPorZona = cantidades;
      });
  }
  getEmpleado(): void {
    this.service
      .getEmpleado(Number(this.route.snapshot.paramMap.get('codigo')))
      .subscribe((empleado) => {
        this.empleado = this.converter.convertirEmpleado(empleado);
        this.fetchZonas();
      });
  }
  fetchZonas(): void {
    this.service
      .getZonasAsignadas(Number(this.route.snapshot.paramMap.get('codigo')))
      .subscribe((zonasAsignadasModel) => {
        this.zonas = this.zonaConverter.convertirZonas(zonasAsignadasModel);
      });
  }
}
