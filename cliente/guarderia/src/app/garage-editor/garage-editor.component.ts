import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GarageDTO } from '../dto/garagedto';
import { GarageService } from '../servicios/garage/garage.service';
import { GaragesConverter } from '../convertidores/garagesConverter';
import { LoginService } from '../servicios/login/login.service';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-garage-editor',
  templateUrl: './garage-editor.component.html',
  styleUrls: ['./garage-editor.component.css'],
})
export class GarageEditorComponent {
  model = new GarageDTO(1);
  service!: GarageService;
  router!: Router;
  route!: ActivatedRoute;
  converter!: GaragesConverter;
  loginService: LoginService;
  constructor(
    service: GarageService,
    router: Router,
    route: ActivatedRoute,
    converter: GaragesConverter,
    loginService: LoginService,
  ) {
    this.loginService = loginService;
    this.service = service;
    this.router = router;
    this.route = route;
    this.converter = converter;
    this.model.numeroGarage = Number(
      this.route.snapshot.paramMap.get('numeroGarage')
    );
    this.getGarage(this.model.numeroGarage);
  }

  getGarage(numeroGarage: number): void {
    this.service
      .getGarage(numeroGarage)
      .subscribe(
        (garage) => (this.model = this.converter.convertirGarage(garage))
      );
  }

  onSubmit(): void {
    this.service
      .updateGarage(this.model)
      .subscribe(() => this.router.navigate(['/administrador']));
  }
}
