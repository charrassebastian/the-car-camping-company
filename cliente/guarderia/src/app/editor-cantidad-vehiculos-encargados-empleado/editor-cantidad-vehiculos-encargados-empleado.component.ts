import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoService } from '../servicios/empleado/empleado.service';
import { LoginService } from '../servicios/login/login.service';

@Component({
  selector: 'app-editor-cantidad-vehiculos-encargados-empleado',
  templateUrl: './editor-cantidad-vehiculos-encargados-empleado.component.html',
  styleUrls: ['./editor-cantidad-vehiculos-encargados-empleado.component.css'],
})
export class EditorCantidadVehiculosEncargadosEmpleadoComponent {
  model = { zona: 'a', vehiculos: 0 };
  service!: EmpleadoService;
  router!: Router;
  route!: ActivatedRoute;
  loginService: LoginService;
  constructor(service: EmpleadoService, router: Router, route: ActivatedRoute, loginService: LoginService) {
    this.service = service;
    this.router = router;
    this.route = route;
    this.loginService = loginService;
  }
  getCodigo(): number {
    return Number(this.route.snapshot.paramMap.get('codigo'));
  }
  onSubmit(): void {
    this.service
      .setCantidadVehiculosAsignados(
        this.getCodigo(),
        this.model.zona,
        this.model.vehiculos
      )
      .subscribe(() => this.router.navigate(['/administrador']));
  }
}
