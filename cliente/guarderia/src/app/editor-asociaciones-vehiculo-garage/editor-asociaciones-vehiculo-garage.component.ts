import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GaragesConverter} from '../convertidores/garagesConverter';
import {VehiculosConverter} from '../convertidores/vehiculosConverter';
import {GarageDTO} from '../dto/garagedto';
import {LoginService} from '../servicios/login/login.service';
import {VehiculoService} from '../servicios/vehiculo/vehiculo.service';

@Component({
  selector: 'app-editor-asociaciones-vehiculo-garage',
  templateUrl: './editor-asociaciones-vehiculo-garage.component.html',
  styleUrls: ['./editor-asociaciones-vehiculo-garage.component.css'],
})
export class EditorAsociacionesVehiculoGarageComponent {
  loginService: LoginService;
  private garageAsignado?: GarageDTO;
  private garagesAsignables!: GarageDTO[];
  private deseaAsignar: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private garagesConverter: GaragesConverter,
    private vehiculoService: VehiculoService,
    private vehiculosConverter: VehiculosConverter,
    loginService: LoginService
  ) {
    this.loginService = loginService;
    this.fetchGarageAsignado();
    this.fetchGaragesAsignables();
  }

  fetchGarageAsignado(): void {
    this.vehiculoService
      .getVehiculo(this.getMatricula())
      .subscribe((vehiculoModel) => {
        let vehiculo = this.vehiculosConverter.convertirVehiculo(vehiculoModel);
        this.garageAsignado = vehiculo.garage;
      });
  }

  fetchGaragesAsignables(): void {
    this.vehiculoService
      .getGaragesAsignables(this.getMatricula())
      .subscribe((garagesModel) => {
        let garages = this.garagesConverter.convertirGarages(garagesModel);
        this.garagesAsignables = garages;
      });
  }

  getMatricula(): string {
    return this.route.snapshot.paramMap.get('matricula') ?? '';
  }

  getDeseaAsignar(): boolean {
    return this.deseaAsignar;
  }

  getGarageAsignado(): GarageDTO | undefined {
    return this.garageAsignado;
  }

  getGaragesAsignables(): GarageDTO[] {
    return this.garagesAsignables;
  }

  abrirSelectorGarages(): void {
    this.deseaAsignar = true;
  }

  asignarGarage(garage: GarageDTO): void {
    this.vehiculoService
      .asignarGarage(this.getMatricula(), garage)
      .subscribe(() => this.router.navigate(['administrador']));
  }

  removerGarage(): void {
    this.vehiculoService
      .removeGarage(this.getMatricula())
      .subscribe(() => this.router.navigate(['administrador']));
  }
}
