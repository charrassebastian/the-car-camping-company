import { Component } from '@angular/core';
import { Router, RouterOutletContract } from '@angular/router';
import { GarageDTO } from '../dto/garagedto';
import { GarageService } from '../servicios/garage/garage.service';

@Component({
  selector: 'app-garage-creador',
  templateUrl: './garage.creador.component.html',
  styleUrls: ['./garage.creador.component.css'],
})
export class GarageCreadorComponent {
  model = new GarageDTO(1);
  service!: GarageService;
  router!: Router;

  constructor(service: GarageService, router: Router) {
    this.service = service;
    this.router = router;
  }

  onSubmit() {
    this.service
      .addGarage(this.model)
      .subscribe(() => this.router.navigate(['/administrador']));
  }
}
