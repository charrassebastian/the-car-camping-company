import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GaragesConverter } from '../convertidores/garagesConverter';
import { ZonasConverter } from '../convertidores/zonasConverter';
import { GarageDTO } from '../dto/garagedto';
import { GarageService } from '../servicios/garage/garage.service';
import { LoginService } from '../servicios/login/login.service';
import { ZonaService } from '../servicios/zona/zona.service';

@Component({
  selector: 'app-editor-asociaciones-zona-garage',
  templateUrl: './editor-asociaciones-zona-garage.component.html',
  styleUrls: ['./editor-asociaciones-zona-garage.component.css'],
})
export class EditorAsociacionesZonaGarageComponent {
  private garagesAsignados!: GarageDTO[];
  private garagesAsignables!: GarageDTO[];
  private deseaAsignar: boolean = false;
  loginService: LoginService;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private garageService: GarageService,
    private zonaService: ZonaService,
    private garagesConverter: GaragesConverter,
    private zonasConverter: ZonasConverter,
    loginService: LoginService
  ) {
    this.loginService = loginService;
    this.fetchGaragesAsignados();
    this.fetchGaragesAsignables();
  }
  fetchGaragesAsignados(): void {
    this.zonaService.getZona(this.getLetra()).subscribe((zonaModel) => {
      let zona = this.zonasConverter.convertirZona(zonaModel);
      this.garagesAsignados = zona.garages ?? [];
    });
  }
  fetchGaragesAsignables(): void {
    this.zonaService
      .getGaragesAsignables(this.getLetra())
      .subscribe((garagesModel) => {
        let garages = this.garagesConverter.convertirGarages(garagesModel);
        this.garagesAsignables = garages;
      });
  }
  getLetra(): string {
    return String(this.route.snapshot.paramMap.get('letra'));
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
    this.zonaService
      .asignarGarage(this.getLetra(), garage)
      .subscribe(() => this.router.navigate(['administrador']));
  }
  removerGarage(garage: GarageDTO): void {
    this.zonaService
      .removeGarage(this.getLetra(), garage.numeroGarage)
      .subscribe(() => this.router.navigate(['administrador']));
  }
}
