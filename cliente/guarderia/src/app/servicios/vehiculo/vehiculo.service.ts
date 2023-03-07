import {Injectable} from '@angular/core';
import {catchError, EMPTY, Observable} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {VehiculoDTO} from 'src/app/dto/vehiculodto';
import {GarageDTO} from 'src/app/dto/garagedto';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class VehiculoService {
  baseUrl = `vehiculos`;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
  };

  constructor(private http: HttpClient, private router: Router) {
  }

  getVehiculo(matricula: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${matricula}`);
  }

  getVehiculos(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  addVehiculo(vehiculo: VehiculoDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}`, vehiculo, this.httpOptions).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 409) {
        this.router.navigate(['error/crearEntidadExistente']);
      }
      return EMPTY;
    }));
  }

  deleteVehiculo(matricula: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${matricula}`, this.httpOptions);
  }

  updateVehiculo(vehiculo: VehiculoDTO): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/${vehiculo.matricula}`,
      vehiculo,
      this.httpOptions
    );
  }

  asignarGarage(matricula: string, garage: GarageDTO): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/${matricula}/garages`,
      garage,
      this.httpOptions
    );
  }

  removeGarage(matricula: string): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/${matricula}/garages`,
      this.httpOptions
    );
  }

  getGaragesAsignables(matricula: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${matricula}/garages/asignables`);
  }

  getSocioAsignado(matricula: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${matricula}/socio`);
  }
}
