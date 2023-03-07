import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../servicios/login/login.service';

@Component({
  selector: 'app-seleccionar-editor-zona',
  templateUrl: './seleccionar-editor-zona.component.html',
  styleUrls: ['./seleccionar-editor-zona.component.css'],
})
export class SeleccionarEditorZonaComponent {
  loginService: LoginService;

  constructor(private router: Router, private route: ActivatedRoute, loginService: LoginService) {
    this.loginService = loginService;
  }

  getLetra(): string | null {
    return this.route.snapshot.paramMap.get('letra');
  }

  editarCampos() {
    this.router.navigate(['editar', 'zona', this.getLetra(), 'campos']);
  }

  editarEmpleados() {
    this.router.navigate(['editar', 'zona', this.getLetra(), 'empleados']);
  }

  editarGarages() {
    this.router.navigate(['editar', 'zona', this.getLetra(), 'garages']);
  }
}
