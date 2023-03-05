import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EmpleadoDTO } from 'src/app/dto/empleadodto';
import { ZonaDTO } from 'src/app/dto/zonadto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  baseUrl = `empleados`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient, private router: Router) {}

  getEmpleado(codigo: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${codigo}`);
  }

  getEmpleados(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  addEmpleado(empleado: EmpleadoDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}`, empleado, this.httpOptions).pipe(catchError((error: HttpErrorResponse) => {
      if(error.status === 409){
        this.router.navigate(['error/crearEntidadExistente']);
      }
      return EMPTY;
    }));
  }

  deleteEmpleado(codigo: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${codigo}`, this.httpOptions);
  }

  updateEmpleado(empleado: EmpleadoDTO): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/${empleado.codigo}`,
      empleado,
      this.httpOptions
    );
  }

  asignarZona(codigo: number, zona: ZonaDTO): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/${codigo}/zonas`,
      zona,
      this.httpOptions
    );
  }

  removeZona(codigo: number, letra: string): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/${codigo}/zonas/${letra}`,
      this.httpOptions
    );
  }

  getZonasAsignables(codigo: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${codigo}/zonas/asignables`);
  }

  getZonasAsignadas(codigo: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${codigo}/zonas/asignadas`);
  }

  getCantidadVehiculosAsignadosPorZona(codigo: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/${codigo}/zonas/cantidadVehiculosAsignados`
    );
  }

  setCantidadVehiculosAsignados(
    codigo: number,
    letra: string,
    cantidadVehiculosAsignados: number
  ): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/${codigo}/zonas/${letra}/cantidadVehiculosAsignados`,
      cantidadVehiculosAsignados,
      this.httpOptions
    );
  }
}
