import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { SocioDTO } from 'src/app/dto/sociodto';
import { VehiculoDTO } from 'src/app/dto/vehiculodto';
import { GarageDTO } from 'src/app/dto/garagedto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SocioService {
  baseUrl = `socios`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient, private router: Router) {}

  getSocio(dni: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${dni}`);
  }

  getSocios(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  addSocio(socio: SocioDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}`, socio, this.httpOptions).pipe(catchError((error: HttpErrorResponse) => {
      if(error.status === 409){
        this.router.navigate(['error/crearEntidadExistente']);
      }
      return EMPTY;
    }));
  }

  deleteSocio(dni: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${dni}`, this.httpOptions);
  }

  updateSocio(socio: SocioDTO): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/${socio.dni}`,
      socio,
      this.httpOptions
    );
  }

  asignarVehiculo(dni: number, vehiculo: VehiculoDTO): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/${dni}/vehiculos`,
      vehiculo,
      this.httpOptions
    );
  }

  removeVehiculo(dni: number, matricula: string): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/${dni}/vehiculos/${matricula}`,
      this.httpOptions
    );
  }

  asignarGarage(dni: number, garage: GarageDTO): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/${dni}/garages`,
      garage,
      this.httpOptions
    );
  }

  removeGarage(dni: number, numeroGarage: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/${dni}/garages/${numeroGarage}`,
      this.httpOptions
    );
  }

  getVehiculosAsignables(dni: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${dni}/vehiculos/asignables`);
  }

  getGaragesAsignables(dni: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${dni}/garages/asignables`);
  }
}
