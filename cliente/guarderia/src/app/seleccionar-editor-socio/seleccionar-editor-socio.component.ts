import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../servicios/login/login.service';

@Component({
  selector: 'app-seleccionar-editor-socio',
  templateUrl: './seleccionar-editor-socio.component.html',
  styleUrls: ['./seleccionar-editor-socio.component.css'],
})
export class SeleccionarEditorSocioComponent {
  loginService: LoginService;

  constructor(private router: Router, private route: ActivatedRoute, loginService: LoginService) {
    this.loginService = loginService;
  }

  getDni(): string | null {
    return this.route.snapshot.paramMap.get('dni');
  }

  editarCampos() {
    this.router.navigate(['editar', 'socio', this.getDni(), 'campos']);
  }

  editarGarages() {
    this.router.navigate(['editar', 'socio', this.getDni(), 'garages']);
  }

  editarVehiculos() {
    this.router.navigate(['editar', 'socio', this.getDni(), 'vehiculos']);
  }

  editarZonas() {
    this.router.navigate(['editar', 'socio', this.getDni(), 'zonas']);
  }
}
