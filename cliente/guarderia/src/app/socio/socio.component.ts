import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SocioDTO} from '../dto/sociodto';
import {FormateadorPorSeparador} from '../formateadores/formateadorPorSeparador';

@Component({
  selector: 'app-socio',
  templateUrl: './socio.component.html',
  styleUrls: ['./socio.component.css'],
})
export class SocioComponent {
  @Input()
  socio!: SocioDTO;
  @Input()
  editable?: boolean;
  @Input()
  borrable?: boolean;
  @Output()
  borrar = new EventEmitter<SocioDTO>();
  @Output()
  editar = new EventEmitter<number>();

  constructor(private formatter: FormateadorPorSeparador) {
  }

  getNumerosGarages(): string {
    return this.socio?.garages?.length ? this.formatter.formatearNumerosGarages(this.socio.garages, ", ") : "none";
  }

  getMatriculasVehiculos(): string {
    return this.socio?.vehiculos?.length ? this.formatter.formatearMatriculasVehiculos(this.socio.vehiculos, ", ") : "none";
  }
}
