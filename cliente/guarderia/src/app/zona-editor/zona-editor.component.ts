import { Component } from '@angular/core';
import { ZonaService } from '../servicios/zona/zona.service';
import { ZonaDTO } from '../dto/zonadto';
import { ActivatedRoute, Router } from '@angular/router';
import { ZonasConverter } from '../convertidores/zonasConverter';
import { LoginService } from '../servicios/login/login.service';

@Component({
  selector: 'app-zona-editor',
  templateUrl: './zona-editor.component.html',
  styleUrls: ['./zona-editor.component.css'],
})
export class ZonaEditorComponent {
  model = new ZonaDTO('a');
  service!: ZonaService;
  router!: Router;
  route!: ActivatedRoute;
  converter!: ZonasConverter;
  loginService: LoginService;
  constructor(
    service: ZonaService,
    router: Router,
    route: ActivatedRoute,
    converter: ZonasConverter,
    loginService: LoginService
  ) {
    this.loginService = loginService;
    this.service = service;
    this.router = router;
    this.route = route;
    this.converter = converter;
    let letraUrl = this.route.snapshot.paramMap.get('letra') ?? 'a';
    this.model.letra = letraUrl;
    this.getZona(this.model.letra);
  }

  getZona(letra: string): void {
    this.service
      .getZona(letra)
      .subscribe((zona) => (this.model = this.converter.convertirZona(zona)));
  }

  onSubmit(): void {
    this.service
      .updateZona(this.model)
      .subscribe(() => this.router.navigate(['/administrador']));
  }
}
