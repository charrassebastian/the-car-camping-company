import {Injectable} from '@angular/core';
import {catchError, EMPTY, Observable} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {AdministradorDTO} from 'src/app/dto/administradordto';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdministradorService {
  baseUrl = `administradores`;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
  };

  constructor(private http: HttpClient, private router: Router) {
  }

  getAdministrador(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getAdministradores(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  addAdministrador(administrador: AdministradorDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}`, administrador, this.httpOptions).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 409) {
        this.router.navigate(['error/crearEntidadExistente']);
      }
      return EMPTY;
    }));
  }

  deleteAdministrador(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, this.httpOptions);
  }

  updateAdministrador(administrador: AdministradorDTO): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/${administrador.id}`,
      administrador,
      this.httpOptions
    );
  }
}
