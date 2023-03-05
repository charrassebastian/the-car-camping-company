import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { GarageDTO } from 'src/app/dto/garagedto';
import { VehiculoDTO } from 'src/app/dto/vehiculodto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GarageService {
  baseUrl = `garages`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient, private router: Router) {}

  getGarage(numeroGarage: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${numeroGarage}`);
  }

  getGarages(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  addGarage(garage: GarageDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}`, garage, this.httpOptions).pipe(catchError((error: HttpErrorResponse) => {
      if(error.status === 409){
        this.router.navigate(['error/crearEntidadExistente']);
      }
      return EMPTY;
    }));
  }

  deleteGarage(numeroGarage: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/${numeroGarage}`,
      this.httpOptions
    );
  }

  updateGarage(garage: GarageDTO): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/${garage.numeroGarage}`,
      garage,
      this.httpOptions
    );
  }

  getSocioAsignado(numeroGarage: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${numeroGarage}/socio`);
  }

  getVehiculoAsignado(numeroGarage: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${numeroGarage}/vehiculo`);
  }

  getZonaAsignada(numeroGarage: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${numeroGarage}/zona`);
  }
}
