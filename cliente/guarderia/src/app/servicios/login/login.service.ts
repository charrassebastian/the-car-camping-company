import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Usuario} from './usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user!: Usuario;
  intentoAutenticar = false;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
  };

  constructor(private http: HttpClient, private router: Router) {
    this.clearUser();
  }

  login(): void {
    this.http.post(`usuario`, this.user, this.httpOptions).subscribe(res => {
      this.user = (res as Usuario);
      if (!this.user.authenticated) {
        this.intentoAutenticar = true;
      } else {
        this.intentoAutenticar = false;
        if (this.user.role === "administrador") {
          this.router.navigate(['/administrador']);
        } else if (this.user.role === "empleado") {
          this.router.navigate(['empleado', this.user.id]);
        } else if (this.user.role === "socio") {
          this.router.navigate(['socio', this.user.id]);
        } else {
          console.log("Rol desconocido: " + this.user.role);
        }
      }
    });
    this.intentoAutenticar = true;
  }

  logout(): void {
    this.clearUser();
  }

  clearUser(): void {
    // this.user = {authenticated: false, id: 0, password: "", role: "", user: ""};
    this.user = {authenticated: true, id: 0, password: "", role: "administrador", user: ""};
  }
}
