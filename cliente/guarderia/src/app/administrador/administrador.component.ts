import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AdministradorDTO} from '../dto/administradordto';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent {
  @Input()
  administrador!: AdministradorDTO;
  @Input()
  editable?: boolean;
  @Input()
  borrable?: boolean;
  @Output()
  borrar = new EventEmitter<AdministradorDTO>();
  @Output()
  editar = new EventEmitter<number>();
}
