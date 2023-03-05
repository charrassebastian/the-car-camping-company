import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ZonaDTO } from 'src/app/dto/zonadto';
import { GarageDTO } from 'src/app/dto/garagedto';
import { EmpleadoDTO } from 'src/app/dto/empleadodto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ZonaService {
  baseUrl = `zonas`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient, private router: Router) {}

  getZona(letra: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${letra}`);
  }

  getZonas(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  addZona(zona: ZonaDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}`, zona, this.httpOptions).pipe(catchError((error: HttpErrorResponse) => {
      if(error.status === 409){
        this.router.navigate(['error/crearEntidadExistente']);
      }
      return EMPTY;
    }));
  }

  deleteZona(letra: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${letra}`, this.httpOptions);
  }

  updateZona(zona: ZonaDTO): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/${zona.letra}`,
      zona,
      this.httpOptions
    );
  }

  asignarEmpleado(letra: string, empleado: EmpleadoDTO): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/${letra}/empleados`,
      empleado,
      this.httpOptions
    );
  }

  removeEmpleado(letra: string, codigo: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/${letra}/empleados/${codigo}`,
      this.httpOptions
    );
  }

  asignarGarage(letra: string, garage: GarageDTO): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/${letra}/garages`,
      garage,
      this.httpOptions
    );
  }

  removeGarage(letra: string, numeroGarage: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/${letra}/garages/${numeroGarage}`,
      this.httpOptions
    );
  }

  getEmpleadosAsignables(letra: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${letra}/empleados/asignables`);
  }

  getEmpleadosAsignados(letra: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${letra}/empleados/asignados`);
  }

  getGaragesAsignables(letra: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${letra}/garages/asignables`);
  }

  getNumeroVehiculosContenidos(letra: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${letra}/numeroVehiculosContenidos`);
  }
}
