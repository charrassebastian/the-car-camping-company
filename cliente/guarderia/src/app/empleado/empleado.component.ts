import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ZonasConverter } from '../convertidores/zonasConverter';
import { EmpleadoDTO } from '../dto/empleadodto';
import { ZonaDTO } from '../dto/zonadto';
import { FormateadorPorSeparador } from '../formateadores/formateadorPorSeparador';
import { EmpleadoService } from '../servicios/empleado/empleado.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css'],
})
export class EmpleadoComponent implements OnChanges {
  @Input()
  empleado!: EmpleadoDTO;
  @Input()
  asignable?: boolean;
  @Input()
  editable?: boolean;
  @Input()
  borrable?: boolean;
  @Output()
  borrar = new EventEmitter<EmpleadoDTO>();
  @Output()
  editar = new EventEmitter<number>();
  @Output()
  asignar = new EventEmitter<EmpleadoDTO>();
  zonas?: ZonaDTO[];
  cantidadVehiculosEncargadosPorZona?: any;
  constructor(
    private service: EmpleadoService,
    private converter: ZonasConverter,
    private formatter: FormateadorPorSeparador
  ) {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes['empleado'].currentValue.codigo !== undefined) {
      this.fetchZonas();
      this.fetchCantidadVehiculosZonas();
    }
  }
  fetchCantidadVehiculosZonas(): void {
    this.service
      .getCantidadVehiculosAsignadosPorZona(this.empleado.codigo)
      .subscribe((cantidades) => {
        this.cantidadVehiculosEncargadosPorZona = cantidades;
      });
  }
  fetchZonas(): void {
    this.service
      .getZonasAsignadas(this.empleado.codigo)
      .subscribe((zonasAsignadasModel) => {
        this.zonas = this.converter.convertirZonas(zonasAsignadasModel);
      });
  }
  getLetrasZonas(): string {
    return this.zonas?.length
      ? this.formatter.formatearLetrasZonas(this.zonas, ', ')
      : 'ninguna';
  }
}
