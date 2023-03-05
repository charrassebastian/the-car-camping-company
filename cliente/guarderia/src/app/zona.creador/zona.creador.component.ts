import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ZonaDTO } from '../dto/zonadto';
import { ZonaService } from '../servicios/zona/zona.service';

@Component({
  selector: 'app-zona-creador',
  templateUrl: './zona.creador.component.html',
  styleUrls: ['./zona.creador.component.css'],
})
export class ZonaCreadorComponent {
  model = new ZonaDTO('a');
  service!: ZonaService;
  router!: Router;

  constructor(service: ZonaService, router: Router) {
    this.service = service;
    this.router = router;
  }

  onSubmit() {
    this.service
      .addZona(this.model)
      .subscribe(() => this.router.navigate(['/administrador']));
  }
}
