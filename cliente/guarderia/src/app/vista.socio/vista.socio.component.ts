import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SociosConverter } from '../convertidores/sociosConverter';
import { SocioDTO } from '../dto/sociodto';
import { LoginService } from '../servicios/login/login.service';
import { SocioService } from '../servicios/socio/socio.service';

@Component({
  selector: 'app-vista-socio',
  templateUrl: './vista.socio.component.html',
  styleUrls: ['./vista.socio.component.css'],
})
export class VistaSocioComponent {
  socio!: SocioDTO;
  loginService: LoginService;
  constructor(
    private service: SocioService,
    private converter: SociosConverter,
    private route: ActivatedRoute,
    loginService: LoginService
  ) {
    this.loginService = loginService;
    this.getSocio();
  }
  getSocio(): void {
    this.service
      .getSocio(Number(this.route.snapshot.paramMap.get('dni')))
      .subscribe((socio) => {
        this.socio = this.converter.convertirSocio(socio);
      });
  }
}
