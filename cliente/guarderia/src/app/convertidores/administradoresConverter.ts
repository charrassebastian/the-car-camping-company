import { Injectable } from '@angular/core';
import { AdministradorDTO } from '../dto/administradordto';

@Injectable({
  providedIn: 'root',
})
export class AdministradoresConverter {
  convertirAdministrador(administradorModel: any): AdministradorDTO {
    return new AdministradorDTO(
      administradorModel.id,
      administradorModel.nombre,
      administradorModel.password
    );
  }

  convertirAdministradores(administradoresModel: any): AdministradorDTO[] {
    let administradores: AdministradorDTO[];
    administradores = [];
    if (
      administradoresModel._embedded &&
      administradoresModel._embedded.administradorList
    ) {
      for (let administradorModel of administradoresModel._embedded
        .administradorList) {
        let administrador: AdministradorDTO;
        administrador = this.convertirAdministrador(administradorModel);
        administradores.push(administrador);
      }
    }
    return administradores;
  }
}
