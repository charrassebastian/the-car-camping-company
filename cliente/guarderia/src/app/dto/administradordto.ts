export class AdministradorDTO {
  id: number;
  nombre: string;
  password: string;

  constructor(id: number, nombre: string, password: string) {
    this.id = id;
    this.nombre = nombre;
    this.password = password;
  }
}
