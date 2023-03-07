import {Component} from '@angular/core';
import {VehiculoService} from '../servicios/vehiculo/vehiculo.service';
import {VehiculoDTO} from '../dto/vehiculodto';
import {ActivatedRoute, Router} from '@angular/router';
import {VehiculosConverter} from '../convertidores/vehiculosConverter';
import {LoginService} from '../servicios/login/login.service';

@Component({
  selector: 'app-vehiculo-editor',
  templateUrl: './vehiculo-editor.component.html',
  styleUrls: ['./vehiculo-editor.component.css'],
})
export class VehiculoEditorComponent {
  model = new VehiculoDTO('matrícula');
  service!: VehiculoService;
  router!: Router;
  route!: ActivatedRoute;
  converter!: VehiculosConverter;
  loginService: LoginService;

  constructor(
    service: VehiculoService,
    router: Router,
    route: ActivatedRoute,
    converter: VehiculosConverter,
    loginService: LoginService
  ) {
    this.loginService = loginService;
    this.service = service;
    this.router = router;
    this.route = route;
    this.converter = converter;
    let matriculaUrl =
      this.route.snapshot.paramMap.get('matricula') ?? 'matricual';
    this.model.matricula = matriculaUrl;
    this.getVehiculo(this.model.matricula);
  }

  getVehiculo(matricula: string): void {
    this.service
      .getVehiculo(matricula)
      .subscribe(
        (vehiculo) => (this.model = this.converter.convertirVehiculo(vehiculo))
      );
  }

  onSubmit(): void {
    this.service
      .updateVehiculo(this.model)
      .subscribe(() => this.router.navigate(['/administrador']));
  }
}
