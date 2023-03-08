import {Component} from '@angular/core';
import {AdministradorService} from '../servicios/administrador/administrador.service';
import {AdministradorDTO} from '../dto/administradordto';
import {Router} from '@angular/router';

@Component({
  selector: 'app-administrador-creador',
  templateUrl: './administrador.creador.component.html',
  styleUrls: ['./administrador.creador.component.css'],
})
export class AdministradorCreadorComponent {
  model = new AdministradorDTO(1, 'Name of the manager', 'Password');
  service!: AdministradorService;
  router!: Router;

  constructor(service: AdministradorService, router: Router) {
    this.service = service;
    this.router = router;
  }

  onSubmit() {
    this.service
      .addAdministrador(this.model)
      .subscribe(() => this.router.navigate(['/administrador']));
  }
}
