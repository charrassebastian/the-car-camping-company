import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {EmpleadoDTO} from '../dto/empleadodto';
import {EmpleadoService} from '../servicios/empleado/empleado.service';

@Component({
  selector: 'app-empleado-creador',
  templateUrl: './empleado.creador.component.html',
  styleUrls: ['./empleado.creador.component.css'],
})
export class EmpleadoCreadorComponent {
  model = new EmpleadoDTO(1, 'Name', 'Password');
  service!: EmpleadoService;
  router!: Router;

  constructor(service: EmpleadoService, router: Router) {
    this.service = service;
    this.router = router;
  }

  onSubmit() {
    this.service
      .addEmpleado(this.model)
      .subscribe(() => this.router.navigate(['/administrador']));
  }
}
