import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GarageDTO} from '../dto/garagedto';

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.css'],
})
export class GarageComponent {
  @Input()
  garage!: GarageDTO;
  @Input()
  asignable?: boolean;
  @Input()
  editable?: boolean;
  @Input()
  borrable?: boolean;
  @Output()
  borrar = new EventEmitter<GarageDTO>();
  @Output()
  editar = new EventEmitter<number>();
  @Output()
  asignar = new EventEmitter<GarageDTO>();
}
