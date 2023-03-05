import { Injectable } from '@angular/core';
import { EmpleadoDTO } from '../dto/empleadodto';

@Injectable({
  providedIn: 'root',
})
export class EmpleadosConverter {
  convertirEmpleado(empleadoModel: any): EmpleadoDTO {
    let empleado = new EmpleadoDTO(
      empleadoModel.codigo,
      empleadoModel.nombre,
      empleadoModel.password,
      empleadoModel.direccion,
      empleadoModel.telefono,
      empleadoModel.especialidad
    );
    return empleado
  }

  convertirEmpleados(empleadosModel: any): EmpleadoDTO[] {
    let empleados: EmpleadoDTO[];
    empleados = [];
    if (empleadosModel._embedded && empleadosModel._embedded.empleadoList) {
      for (let empleadoModel of empleadosModel._embedded.empleadoList) {
        let empleado: EmpleadoDTO;
        empleado = this.convertirEmpleado(empleadoModel);
        empleados.push(empleado);
      }
    }
    return empleados;
  }
}
