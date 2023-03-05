import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SocioDTO } from '../dto/sociodto';
import { SocioService } from '../servicios/socio/socio.service';

@Component({
  selector: 'app-socio-creador',
  templateUrl: './socio.creador.component.html',
  styleUrls: ['./socio.creador.component.css'],
})
export class SocioCreadorComponent {
  model = new SocioDTO(1, 'Nombre', 'Password');
  service!: SocioService;
  router!: Router;

  constructor(service: SocioService, router: Router) {
    this.service = service;
    this.router = router;
  }

  onSubmit() {
    this.service
      .addSocio(this.model)
      .subscribe(() => this.router.navigate(['/administrador']));
  }
}
