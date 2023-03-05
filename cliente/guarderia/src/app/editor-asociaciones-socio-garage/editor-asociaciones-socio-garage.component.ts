import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GaragesConverter } from '../convertidores/garagesConverter';
import { GarageDTO } from '../dto/garagedto';
import { SocioService } from '../servicios/socio/socio.service';
import { GarageService } from '../servicios/garage/garage.service';
import { SociosConverter } from '../convertidores/sociosConverter';
import { LoginService } from '../servicios/login/login.service';

@Component({
  selector: 'app-editor-asociaciones-socio-garage',
  templateUrl: './editor-asociaciones-socio-garage.component.html',
  styleUrls: ['./editor-asociaciones-socio-garage.component.css'],
})
export class EditorAsociacionesSocioGarageComponent {
  private garagesAsignados!: GarageDTO[];
  private garagesAsignables!: GarageDTO[];
  private deseaAsignar: boolean = false;
  loginService: LoginService;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private socioService: SocioService,
    private sociosConverter: SociosConverter,
    private garageService: GarageService,
    private garagesConverter: GaragesConverter,
    loginService: LoginService
  ) {
    this.loginService = loginService;
    this.fetchGaragesAsignados();
    this.fetchGaragesAsignables();
  }
  fetchGaragesAsignados(): void {
    this.socioService.getSocio(this.getDni()).subscribe((socioModel) => {
      let socio = this.sociosConverter.convertirSocio(socioModel);
      this.garagesAsignados = socio.garages ?? [];
    });
  }
  fetchGaragesAsignables(): void {
    this.socioService
      .getGaragesAsignables(this.getDni())
      .subscribe((garagesModel) => {
        let garages = this.garagesConverter.convertirGarages(garagesModel);
        this.garagesAsignables = garages;
      });
  }
  getDni(): number {
    return Number(this.route.snapshot.paramMap.get('dni'));
  }
  getDeseaAsignar(): boolean {
    return this.deseaAsignar;
  }
  getGaragesAsignados(): GarageDTO[] {
    return this.garagesAsignados;
  }
  getGaragesAsignables(): GarageDTO[] {
    return this.garagesAsignables;
  }
  abrirSelectorGarages(): void {
    this.deseaAsignar = true;
  }
  asignarGarage(garage: GarageDTO): void {
    this.socioService
      .asignarGarage(this.getDni(), garage)
      .subscribe(() => this.router.navigate(['administrador']));
  }
  removerGarage(garage: GarageDTO): void {
    this.socioService
      .removeGarage(this.getDni(), garage.numeroGarage)
      .subscribe(() => this.router.navigate(['administrador']));
  }
}
