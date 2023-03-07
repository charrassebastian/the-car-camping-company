import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../servicios/login/login.service';

@Component({
  selector: 'app-seleccionar-editor-empleado',
  templateUrl: './seleccionar-editor-empleado.component.html',
  styleUrls: ['./seleccionar-editor-empleado.component.css'],
})
export class SeleccionarEditorEmpleadoComponent {
  loginService: LoginService;

  constructor(private router: Router, private route: ActivatedRoute, loginService: LoginService) {
    this.loginService = loginService;
  }

  getCodigo(): string | null {
    return this.route.snapshot.paramMap.get('codigo');
  }

  editarCampos() {
    this.router.navigate(['/editar/empleado/', this.getCodigo(), 'campos']);
  }

  editarZonas() {
    this.router.navigate(['/editar/empleado', this.getCodigo(), 'zonas']);
  }

  editarCantidadVehiculosAsignados() {
    this.router.navigate([
      '/editar/empleado',
      this.getCodigo(),
      'zonas',
      'cantidadVehiculosAsignados',
    ]);
  }
}
