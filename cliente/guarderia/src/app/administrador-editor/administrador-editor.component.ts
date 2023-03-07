import {Component} from '@angular/core';
import {AdministradorService} from '../servicios/administrador/administrador.service';
import {AdministradorDTO} from '../dto/administradordto';
import {ActivatedRoute, Router} from '@angular/router';
import {AdministradoresConverter} from '../convertidores/administradoresConverter';
import {LoginService} from '../servicios/login/login.service';

@Component({
  selector: 'app-administrador-editor',
  templateUrl: './administrador-editor.component.html',
  styleUrls: ['./administrador-editor.component.css'],
})
export class AdministradorEditorComponent {
  model = new AdministradorDTO(1, 'Name of the administrator', 'Password');
  service!: AdministradorService;
  router!: Router;
  route!: ActivatedRoute;
  converter!: AdministradoresConverter;
  loginService: LoginService;

  constructor(
    service: AdministradorService,
    router: Router,
    route: ActivatedRoute,
    converter: AdministradoresConverter,
    loginService: LoginService
  ) {
    this.loginService = loginService;
    this.service = service;
    this.router = router;
    this.route = route;
    this.converter = converter;
    this.model.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getAdministrador(this.model.id);
  }

  getAdministrador(id: number): void {
    this.service
      .getAdministrador(id)
      .subscribe(
        (administrador) =>
          (this.model = this.converter.convertirAdministrador(administrador))
      );
  }

  onSubmit(): void {
    this.service
      .updateAdministrador(this.model)
      .subscribe(() => this.router.navigate(['/administrador']));
  }
}
