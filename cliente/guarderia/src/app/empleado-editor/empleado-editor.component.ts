import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadosConverter } from '../convertidores/empleadosConverter';
import { EmpleadoDTO } from '../dto/empleadodto';
import { EmpleadoService } from '../servicios/empleado/empleado.service';
import { LoginService } from '../servicios/login/login.service';

@Component({
  selector: 'app-empleado-editor',
  templateUrl: './empleado-editor.component.html',
  styleUrls: ['./empleado-editor.component.css'],
})
export class EmpleadoEditorComponent {
  model = new EmpleadoDTO(1, 'Nombre', 'Password');
  service!: EmpleadoService;
  router!: Router;
  route!: ActivatedRoute;
  converter!: EmpleadosConverter;
  loginService: LoginService;
  constructor(
    service: EmpleadoService,
    router: Router,
    route: ActivatedRoute,
    converter: EmpleadosConverter,
    loginService: LoginService
  ) {
    this.loginService = loginService;
    this.service = service;
    this.router = router;
    this.route = route;
    this.converter = converter;
    this.model.codigo = Number(this.route.snapshot.paramMap.get('codigo'));
    this.getEmpleado(this.model.codigo);
  }
  getEmpleado(codigo: number): void {
    this.service
      .getEmpleado(codigo)
      .subscribe(
        (empleado) => (this.model = this.converter.convertirEmpleado(empleado))
      );
  }

  onSubmit(): void {
    this.service
      .updateEmpleado(this.model)
      .subscribe(() => this.router.navigate(['/administrador']));
  }
}
