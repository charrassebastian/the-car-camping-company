import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ZonasConverter} from '../convertidores/zonasConverter';
import {ZonaDTO} from '../dto/zonadto';
import {EmpleadoService} from '../servicios/empleado/empleado.service';
import {LoginService} from '../servicios/login/login.service';

@Component({
  selector: 'app-editor-asociaciones-empleado-zona',
  templateUrl: './editor-asociaciones-empleado-zona.component.html',
  styleUrls: ['./editor-asociaciones-empleado-zona.component.css'],
})
export class EditorAsociacionesEmpleadoZonaComponent {
  loginService: LoginService;
  private zonasAsignadas!: ZonaDTO[];
  private zonasAsignables!: ZonaDTO[];
  private deseaAsignar: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private empleadoService: EmpleadoService,
    private zonasConverter: ZonasConverter,
    loginService: LoginService
  ) {
    this.loginService = loginService;
    this.fetchZonasAsignadas();
    this.fetchZonasAsignables();
  }

  fetchZonasAsignadas(): void {
    this.empleadoService
      .getZonasAsignadas(this.getCodigo())
      .subscribe((zonasAsignadasModel) => {
        this.zonasAsignadas =
          this.zonasConverter.convertirZonas(zonasAsignadasModel);
      });
  }

  fetchZonasAsignables(): void {
    this.empleadoService
      .getZonasAsignables(this.getCodigo())
      .subscribe(
        (zonas) =>
          (this.zonasAsignables = this.zonasConverter.convertirZonas(zonas))
      );
  }

  getCodigo(): number {
    return Number(this.route.snapshot.paramMap.get('codigo'));
  }

  getDeseaAsignar(): boolean {
    return this.deseaAsignar;
  }

  getZonasAsignadas(): ZonaDTO[] {
    return this.zonasAsignadas;
  }

  getZonasAsignables(): ZonaDTO[] {
    return this.zonasAsignables;
  }

  abrirSelectorZonas(): void {
    this.deseaAsignar = true;
  }

  asignarZona(zona: ZonaDTO): void {
    this.empleadoService
      .asignarZona(this.getCodigo(), zona)
      .subscribe(() => this.router.navigate(['administrador']));
  }

  removerZona(zona: ZonaDTO): void {
    this.empleadoService
      .removeZona(this.getCodigo(), zona.letra)
      .subscribe(() => this.router.navigate(['administrador']));
  }
}
