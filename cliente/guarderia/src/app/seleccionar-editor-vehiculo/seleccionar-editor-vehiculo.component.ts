import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../servicios/login/login.service';

@Component({
  selector: 'app-seleccionar-editor-vehiculo',
  templateUrl: './seleccionar-editor-vehiculo.component.html',
  styleUrls: ['./seleccionar-editor-vehiculo.component.css'],
})
export class SeleccionarEditorVehiculoComponent {
  loginService: LoginService;

  constructor(private router: Router, private route: ActivatedRoute, loginService: LoginService) {
    this.loginService = loginService;
  }

  getMatricula(): string | null {
    return this.route.snapshot.paramMap.get('matricula');
  }

  editarCampos() {
    this.router.navigate(['editar', 'vehiculo', this.getMatricula(), 'campos']);
  }

  editarGarage() {
    this.router.navigate(['editar', 'vehiculo', this.getMatricula(), 'garage']);
  }
}
