import {Injectable} from '@angular/core';
import {EmpleadoDTO} from '../dto/empleadodto';
import {GarageDTO} from '../dto/garagedto';
import {SocioDTO} from '../dto/sociodto';
import {VehiculoDTO} from '../dto/vehiculodto';
import {ZonaDTO} from '../dto/zonadto';

@Injectable({
  providedIn: 'root',
})
export class FormateadorPorSeparador {
  formatearCadenas(cadenas: string[], separador: string): string {
    let res = '';
    if (cadenas.length) {
      res += cadenas[0];
      for (let i = 1; i < cadenas.length; i++) {
        res += separador;
        res += cadenas[i];
      }
    }
    return res;
  }

  formatearNumeros(numeros: number[], separador: string): string {
    let res = '';
    if (numeros.length) {
      res += String(numeros[0]);
      for (let i = 1; i < numeros.length; i++) {
        res += separador;
        res += String(numeros[i]);
      }
    }
    return res;
  }

  formatearCodigosEmpleados(
    empleados: EmpleadoDTO[],
    separador: string
  ): string {
    let codigos = [];
    for (let empleado of empleados) {
      codigos.push(empleado.codigo);
    }
    return this.formatearNumeros(codigos, separador);
  }

  formatearNumerosGarages(garages: GarageDTO[], separador: string): string {
    let numerosGarages = [];
    for (let garage of garages) {
      numerosGarages.push(garage.numeroGarage);
    }
    return this.formatearNumeros(numerosGarages, separador);
  }

  formatearDocumentosSocios(socios: SocioDTO[], separador: string): string {
    let documentos = [];
    for (let socio of socios) {
      documentos.push(socio.dni);
    }
    return this.formatearNumeros(documentos, separador);
  }

  formatearMatriculasVehiculos(
    vehiculos: VehiculoDTO[],
    separador: string
  ): string {
    let matriculas = [];
    for (let vehiculo of vehiculos) {
      matriculas.push(vehiculo.matricula);
    }
    return this.formatearCadenas(matriculas, separador);
  }

  formatearLetrasZonas(zonas: ZonaDTO[], separador: string): string {
    let letras = [];
    for (let zona of zonas) {
      letras.push(zona.letra);
    }
    return this.formatearCadenas(letras, separador);
  }
}
