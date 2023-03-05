import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SociosConverter } from '../convertidores/sociosConverter';
import { VehiculosConverter } from '../convertidores/vehiculosConverter';
import { SocioDTO } from '../dto/sociodto';
import { VehiculoDTO } from '../dto/vehiculodto';
import { LoginService } from '../servicios/login/login.service';
import { SocioService } from '../servicios/socio/socio.service';
import { VehiculoService } from '../servicios/vehiculo/vehiculo.service';

@Component({
  selector: 'app-editor-asociaciones-socio-vehiculo',
  templateUrl: './editor-asociaciones-socio-vehiculo.component.html',
  styleUrls: ['./editor-asociaciones-socio-vehiculo.component.css'],
})
export class EditorAsociacionesSocioVehiculoComponent {
  private vehiculosAsignables!: VehiculoDTO[];
  private deseaAsignar: boolean = false;
  private socio = new SocioDTO(1, 'nombre', 'password');
  loginService: LoginService;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private socioService: SocioService,
    private vehiculoService: VehiculoService,
    private vehiculosConverter: VehiculosConverter,
    private sociosConverter: SociosConverter,
    loginService: LoginService
  ) {
    this.loginService = loginService;
    this.getSocio();
    this.fetchVehiculosAsignables();
  }
  getSocio(): void {
    this.socioService
      .getSocio(Number(this.route.snapshot.paramMap.get('dni')))
      .subscribe(
        (socio) => (this.socio = this.sociosConverter.convertirSocio(socio))
      );
  }
  contieneSocioActual(vehiculo: VehiculoDTO): boolean {
    let contieneSocio = false;
    if (this.socio?.vehiculos?.length) {
      let i = 0;
      while (i < this.socio.vehiculos.length) {
        if (this.socio.vehiculos[i].matricula === vehiculo.matricula) {
          contieneSocio = true;
        }
        i++;
      }
    }
    return contieneSocio;
  }
  fetchVehiculosAsignables(): void {
    this.socioService.getVehiculosAsignables(this.getDni()).subscribe((vehiculos) => {
      let vehiculosAsignables =
        this.vehiculosConverter.convertirVehiculos(vehiculos);
      this.vehiculosAsignables = vehiculosAsignables;
    });
  }
  getDni(): number {
    return Number(this.route.snapshot.paramMap.get('dni'));
  }
  getDeseaAsignar(): boolean {
    return this.deseaAsignar;
  }
  getVehiculosAsignados(): VehiculoDTO[] {
    return this.socio.vehiculos ?? [];
  }
  getVehiculosAsignables(): VehiculoDTO[] {
    return this.vehiculosAsignables;
  }
  abrirSelectorVehiculos(): void {
    this.deseaAsignar = true;
  }
  asignarVehiculo(vehiculo: VehiculoDTO): void {
    this.socioService
      .asignarVehiculo(this.getDni(), vehiculo)
      .subscribe(() => this.router.navigate(['administrador']));
  }
  removerVehiculo(vehiculo: VehiculoDTO): void {
    this.socioService
      .removeVehiculo(this.getDni(), vehiculo.matricula)
      .subscribe(() => this.router.navigate(['administrador']));
  }
}
