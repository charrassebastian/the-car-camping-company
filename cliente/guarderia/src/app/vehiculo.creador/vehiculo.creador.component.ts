import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {VehiculoDTO} from '../dto/vehiculodto';
import {VehiculoService} from '../servicios/vehiculo/vehiculo.service';

@Component({
  selector: 'app-vehiculo-creador',
  templateUrl: './vehiculo.creador.component.html',
  styleUrls: ['./vehiculo.creador.component.css'],
})
export class VehiculoCreadorComponent {
  model = new VehiculoDTO('matrícula');
  service!: VehiculoService;
  router!: Router;

  constructor(service: VehiculoService, router: Router) {
    this.service = service;
    this.router = router;
  }

  onSubmit() {
    this.service
      .addVehiculo(this.model)
      .subscribe(() => this.router.navigate(['/administrador']));
  }
}
