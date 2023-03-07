import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EmpleadosConverter} from '../convertidores/empleadosConverter';
import {ZonasConverter} from '../convertidores/zonasConverter';
import {EmpleadoDTO} from '../dto/empleadodto';
import {EmpleadoService} from '../servicios/empleado/empleado.service';
import {LoginService} from '../servicios/login/login.service';
import {ZonaService} from '../servicios/zona/zona.service';

@Component({
  selector: 'app-editor-asociaciones-zona-empleado',
  templateUrl: './editor-asociaciones-zona-empleado.component.html',
  styleUrls: ['./editor-asociaciones-zona-empleado.component.css'],
})
export class EditorAsociacionesZonaEmpleadoComponent {
  loginService: LoginService;
  private empleadosAsignados!: EmpleadoDTO[];
  private empleadosAsignables!: EmpleadoDTO[];
  private deseaAsignar: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private empleadoService: EmpleadoService,
    private zonaService: ZonaService,
    private empleadosConverter: EmpleadosConverter,
    private zonasConverter: ZonasConverter,
    loginService: LoginService
  ) {
    this.loginService = loginService;
    this.fetchEmpleadosAsignados();
    this.fetchEmpleadosAsignables();
  }

  fetchEmpleadosAsignados(): void {
    this.zonaService
      .getEmpleadosAsignados(this.getLetra())
      .subscribe((empleadosAsignadosModel) => {
        this.empleadosAsignados = this.empleadosConverter.convertirEmpleados(
          empleadosAsignadosModel
        );
      });
  }

  fetchEmpleadosAsignables(): void {
    this.zonaService
      .getEmpleadosAsignables(this.getLetra())
      .subscribe((empleadosModel) => {
        let empleados =
          this.empleadosConverter.convertirEmpleados(empleadosModel);
        this.empleadosAsignables = empleados;
      });
  }

  getLetra(): string {
    return String(this.route.snapshot.paramMap.get('letra'));
  }

  getDeseaAsignar(): boolean {
    return this.deseaAsignar;
  }

  getEmpleadosAsignados(): EmpleadoDTO[] {
    return this.empleadosAsignados;
  }

  getEmpleadosAsignables(): EmpleadoDTO[] {
    return this.empleadosAsignables;
  }

  abrirSelectorEmpleados(): void {
    this.deseaAsignar = true;
  }

  asignarEmpleado(empleado: EmpleadoDTO): void {
    this.zonaService
      .asignarEmpleado(this.getLetra(), empleado)
      .subscribe(() => this.router.navigate(['administrador']));
  }

  removerEmpleado(empleado: EmpleadoDTO): void {
    this.zonaService
      .removeEmpleado(this.getLetra(), empleado.codigo)
      .subscribe(() => this.router.navigate(['administrador']));
  }
}
