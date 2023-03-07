import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-error-crear-entidad-existente',
  templateUrl: './error-crear-entidad-existente.component.html',
  styleUrls: ['./error-crear-entidad-existente.component.css'],
})
export class ErrorCrearEntidadExistenteComponent {
  constructor(private router: Router) {
  }
}
