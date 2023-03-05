import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDTO } from '../dto/logindto';
import { LoginService } from '../servicios/login/login.service';
import { Usuario } from '../servicios/login/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  service: LoginService;
  constructor(service: LoginService){
    this.service = service;
  }
  onSubmit(): void {
    this.service.login();
  }
}
