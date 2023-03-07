import {Component, EventEmitter, Input, Output} from '@angular/core';
import {VehiculoDTO} from '../dto/vehiculodto';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css'],
})
export class VehiculoComponent {
  @Input()
  vehiculo!: VehiculoDTO;
  @Input()
  asignable?: boolean;
  @Input()
  editable?: boolean;
  @Input()
  borrable?: boolean;
  @Output()
  borrar = new EventEmitter<VehiculoDTO>();
  @Output()
  editar = new EventEmitter<string>();
  @Output()
  asignar = new EventEmitter<VehiculoDTO>();
}
