import { Component } from '@angular/core';
import { SocioDTO } from '../dto/sociodto';
import { ActivatedRoute, Router } from '@angular/router';
import { SocioService } from '../servicios/socio/socio.service';
import { SociosConverter } from '../convertidores/sociosConverter';
import { LoginService } from '../servicios/login/login.service';

@Component({
  selector: 'app-socio-editor',
  templateUrl: './socio-editor.component.html',
  styleUrls: ['./socio-editor.component.css'],
})
export class SocioEditorComponent {
  model = new SocioDTO(1, 'Nombre', 'Password');
  service!: SocioService;
  router!: Router;
  route!: ActivatedRoute;
  converter!: SociosConverter;
  loginService: LoginService;
  constructor(
    service: SocioService,
    router: Router,
    route: ActivatedRoute,
    converter: SociosConverter,
    loginService: LoginService
  ) {
    this.loginService = loginService;
    this.service = service;
    this.router = router;
    this.route = route;
    this.converter = converter;
    this.model.dni = Number(this.route.snapshot.paramMap.get('dni'));
    this.getSocio(this.model.dni);
  }

  getSocio(dni: number): void {
    this.service
      .getSocio(dni)
      .subscribe(
        (socio) => (this.model = this.converter.convertirSocio(socio))
      );
  }

  onSubmit(): void {
    this.service
      .updateSocio(this.model)
      .subscribe(() => this.router.navigate(['/administrador']));
  }
}
