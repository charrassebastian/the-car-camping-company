import {Component} from '@angular/core';
import {LoginService} from '../servicios/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  service: LoginService;

  constructor(service: LoginService) {
    this.service = service;
  }

  onSubmit(): void {
    this.service.login();
  }
}
