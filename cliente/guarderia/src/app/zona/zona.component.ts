import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges,} from '@angular/core';
import {EmpleadosConverter} from '../convertidores/empleadosConverter';
import {EmpleadoDTO} from '../dto/empleadodto';
import {ZonaDTO} from '../dto/zonadto';
import {FormateadorPorSeparador} from '../formateadores/formateadorPorSeparador';
import {ZonaService} from '../servicios/zona/zona.service';

@Component({
  selector: 'app-zona',
  templateUrl: './zona.component.html',
  styleUrls: ['./zona.component.css'],
})
export class ZonaComponent implements OnChanges {
  @Input()
  zona!: ZonaDTO;
  @Input()
  asignable?: boolean;
  @Input()
  editable?: boolean;
  @Input()
  borrable?: boolean;
  @Output()
  asignar = new EventEmitter<ZonaDTO>();
  @Output()
  borrar = new EventEmitter<ZonaDTO>();
  @Output()
  editar = new EventEmitter<string>();
  numeroVehiculosContenidos?: number;
  empleados?: EmpleadoDTO[];

  constructor(
    private service: ZonaService,
    private converter: EmpleadosConverter,
    private formatter: FormateadorPorSeparador
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['zona'].currentValue.letra !== undefined) {
      this.fetchEmpleados();
      this.fetchNumeroVehiculosAsignados();
    }
  }

  fetchEmpleados() {
    this.service
      .getEmpleadosAsignados(this.zona.letra)
      .subscribe((empleadosAsignadosModel) => {
        this.empleados = this.converter.convertirEmpleados(
          empleadosAsignadosModel
        );
      });
  }

  fetchNumeroVehiculosAsignados() {
    this.service
      .getNumeroVehiculosContenidos(this.zona.letra)
      .subscribe((numeroVehiculosContenidos) => {
        this.numeroVehiculosContenidos = numeroVehiculosContenidos;
      });
  }

  getCodigosEmpleados(): string {
    return this.empleados?.length
      ? this.formatter.formatearCodigosEmpleados(this.empleados, ', ')
      : 'none';
  }

  getNumerosGarages(): string {
    return this.zona.garages?.length
      ? this.formatter.formatearNumerosGarages(this.zona.garages, ', ')
      : 'none';
  }
}
