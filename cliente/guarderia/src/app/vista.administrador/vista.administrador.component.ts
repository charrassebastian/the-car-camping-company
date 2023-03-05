import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdministradoresConverter } from '../convertidores/administradoresConverter';
import { EmpleadosConverter } from '../convertidores/empleadosConverter';
import { GaragesConverter } from '../convertidores/garagesConverter';
import { SociosConverter } from '../convertidores/sociosConverter';
import { VehiculosConverter } from '../convertidores/vehiculosConverter';
import { ZonasConverter } from '../convertidores/zonasConverter';
import { AdministradorDTO } from '../dto/administradordto';
import { EmpleadoDTO } from '../dto/empleadodto';
import { GarageDTO } from '../dto/garagedto';
import { SocioDTO } from '../dto/sociodto';
import { VehiculoDTO } from '../dto/vehiculodto';
import { ZonaDTO } from '../dto/zonadto';
import { ErrorBorrarEntidadAsociacionVigenteComponent } from '../error-borrar-entidad-asociacion-vigente/error-borrar-entidad-asociacion-vigente.component';
import { AdministradorService } from '../servicios/administrador/administrador.service';
import { EmpleadoService } from '../servicios/empleado/empleado.service';
import { ErrorBorrarEntidadAsociacionVigenteService } from '../servicios/error/error-borrar-entidad-asociacion-vigente.service';
import { GarageService } from '../servicios/garage/garage.service';
import { LoginService } from '../servicios/login/login.service';
import { SocioService } from '../servicios/socio/socio.service';
import { VehiculoService } from '../servicios/vehiculo/vehiculo.service';
import { ZonaService } from '../servicios/zona/zona.service';

@Component({
  selector: 'app-vista-administrador',
  templateUrl: './vista.administrador.component.html',
  styleUrls: ['./vista.administrador.component.css'],
})
export class VistaAdministradorComponent {
  administradores!: AdministradorDTO[];
  administradorService!: AdministradorService;
  administradoresConverter!: AdministradoresConverter;
  empleados!: EmpleadoDTO[];
  empleadoService!: EmpleadoService;
  empleadosConverter!: EmpleadosConverter;
  garages!: GarageDTO[];
  garageService!: GarageService;
  garagesConverter!: GaragesConverter;
  socios!: SocioDTO[];
  socioService!: SocioService;
  sociosConverter!: SociosConverter;
  vehiculos!: VehiculoDTO[];
  vehiculoService!: VehiculoService;
  vehiculosConverter!: VehiculosConverter;
  zonas!: ZonaDTO[];
  zonaService!: ZonaService;
  zonasConverter!: ZonasConverter;
  router!: Router;
  errorBorrarEntidadAsociacionVigenteService!: ErrorBorrarEntidadAsociacionVigenteService;
  loginService: LoginService;

  constructor(
    administradorService: AdministradorService,
    administradoresConverter: AdministradoresConverter,
    empleadoService: EmpleadoService,
    empleadosConverter: EmpleadosConverter,
    garageService: GarageService,
    garagesConverter: GaragesConverter,
    socioService: SocioService,
    sociosConverter: SociosConverter,
    vehiculoService: VehiculoService,
    vehiculosConverter: VehiculosConverter,
    zonaService: ZonaService,
    zonasConverter: ZonasConverter,
    router: Router,
    errorBorrarEntidadAsociacionVigenteService: ErrorBorrarEntidadAsociacionVigenteService,
    loginService: LoginService
  ) {
    this.administradorService = administradorService;
    this.empleadoService = empleadoService;
    this.garageService = garageService;
    this.socioService = socioService;
    this.vehiculoService = vehiculoService;
    this.zonaService = zonaService;
    this.administradoresConverter = administradoresConverter;
    this.empleadosConverter = empleadosConverter;
    this.garagesConverter = garagesConverter;
    this.sociosConverter = sociosConverter;
    this.vehiculosConverter = vehiculosConverter;
    this.zonasConverter = zonasConverter;
    this.getEntidades();
    this.router = router;
    this.errorBorrarEntidadAsociacionVigenteService =
      errorBorrarEntidadAsociacionVigenteService;
    this.loginService = loginService;
    console.log(this.loginService.user);
  }

  getEntidades(): void {
    this.getAdministradores();
    this.getEmpleados();
    this.getGarages();
    this.getSocios();
    this.getVehiculos();
    this.getZonas();
  }

  getAdministradores(): void {
    this.administradorService
      .getAdministradores()
      .subscribe(
        (administradoresModel) =>
          (this.administradores =
            this.administradoresConverter.convertirAdministradores(
              administradoresModel
            ))
      );
  }

  getEmpleados(): void {
    this.empleadoService
      .getEmpleados()
      .subscribe(
        (empleadosModel) =>
          (this.empleados =
            this.empleadosConverter.convertirEmpleados(empleadosModel))
      );
  }

  getGarages(): void {
    this.garageService
      .getGarages()
      .subscribe(
        (garagesModel) =>
          (this.garages = this.garagesConverter.convertirGarages(garagesModel))
      );
  }

  getSocios(): void {
    this.socioService
      .getSocios()
      .subscribe(
        (sociosModel) =>
          (this.socios = this.sociosConverter.convertirSocios(sociosModel))
      );
  }

  getVehiculos(): void {
    this.vehiculoService
      .getVehiculos()
      .subscribe(
        (vehiculosModel) =>
          (this.vehiculos =
            this.vehiculosConverter.convertirVehiculos(vehiculosModel))
      );
  }

  getZonas(): void {
    this.zonaService
      .getZonas()
      .subscribe(
        (zonasModel) =>
          (this.zonas = this.zonasConverter.convertirZonas(zonasModel))
      );
  }

  borrarAdministrador(administrador: AdministradorDTO): void {
    this.administradorService.deleteAdministrador(administrador.id).subscribe();
    this.administradores = this.administradores.filter(
      (administradorActual) => administradorActual.id !== administrador.id
    );
  }

  borrarEmpleado(empleado: EmpleadoDTO): void {
    let zonasAsignadas: ZonaDTO[] | undefined;
    this.empleadoService
      .getZonasAsignadas(empleado.codigo)
      .subscribe((zonasAsignadasModel) => {
        if(zonasAsignadasModel){
          zonasAsignadas =
          this.zonasConverter.convertirZonas(zonasAsignadasModel);  
        }
        if (zonasAsignadas?.length) {
          this.errorBorrarEntidadAsociacionVigenteService.clear();
          this.errorBorrarEntidadAsociacionVigenteService.setZonas(
            zonasAsignadas
          );
          this.router.navigate(['error/borrarEntidadConAsociaciones']);
        } else {
          this.empleadoService.deleteEmpleado(empleado.codigo).subscribe();
          this.empleados = this.empleados.filter(
            (empleadoActual) => empleadoActual.codigo !== empleado.codigo
          );
        }
      });
  }

  borrarGarage(garage: GarageDTO): void {
    let socioAsignado: SocioDTO | undefined;
    let vehiculoAsignado: VehiculoDTO | undefined;
    let zonaAsignada: ZonaDTO | undefined;
    this.garageService
      .getSocioAsignado(garage.numeroGarage)
      .subscribe((socioAsignadoModel) => {
        if(socioAsignadoModel){
          socioAsignado = this.sociosConverter.convertirSocio(socioAsignadoModel);
        }
        this.garageService
          .getVehiculoAsignado(garage.numeroGarage)
          .subscribe((vehiculoAsignadoModel) => {
            if(vehiculoAsignadoModel){
              vehiculoAsignado = this.vehiculosConverter.convertirVehiculo(
                vehiculoAsignadoModel
              );
            }
            this.garageService
              .getZonaAsignada(garage.numeroGarage)
              .subscribe((zonaAsignadaModel) => {
                if(zonaAsignadaModel){
                  zonaAsignada =
                  this.zonasConverter.convertirZona(zonaAsignadaModel);
                }
                if (socioAsignado || vehiculoAsignado || zonaAsignada) {
                  this.errorBorrarEntidadAsociacionVigenteService.clear();
                  if (socioAsignado) {
                    this.errorBorrarEntidadAsociacionVigenteService.setSocios([
                      socioAsignado,
                    ]);
                  }
                  if (vehiculoAsignado) {
                    this.errorBorrarEntidadAsociacionVigenteService.setVehiculos(
                      [vehiculoAsignado]
                    );
                  }
                  if (zonaAsignada) {
                    this.errorBorrarEntidadAsociacionVigenteService.setZonas([
                      zonaAsignada,
                    ]);
                  }
                  this.router.navigate(['error/borrarEntidadConAsociaciones']);
                } else {
                  this.garageService
                    .deleteGarage(garage.numeroGarage)
                    .subscribe();
                  this.garages = this.garages.filter(
                    (garageActual) =>
                      garageActual.numeroGarage !== garage.numeroGarage
                  );
                }
              });
          });
      });
  }

  borrarSocio(socio: SocioDTO): void {
    if (socio.garages?.length || socio.vehiculos?.length) {
      this.errorBorrarEntidadAsociacionVigenteService.clear();
      if (socio.garages?.length) {
        this.errorBorrarEntidadAsociacionVigenteService.setGarages(
          socio.garages
        );
      }
      if (socio.vehiculos?.length) {
        this.errorBorrarEntidadAsociacionVigenteService.setVehiculos(
          socio.vehiculos
        );
      }
      this.router.navigate(['error/borrarEntidadConAsociaciones']);
    } else {
      this.socioService.deleteSocio(socio.dni).subscribe();
      this.socios = this.socios.filter(
        (socioActual) => socioActual.dni !== socio.dni
      );
    }
  }

  borrarVehiculo(vehiculo: VehiculoDTO): void {
    let socioAsignado: SocioDTO | undefined;
    this.vehiculoService
      .getSocioAsignado(vehiculo.matricula)
      .subscribe((socioAsignadoModel) => {
        if(socioAsignadoModel){
          socioAsignado = this.sociosConverter.convertirSocio(socioAsignadoModel);
        }
        if (vehiculo.garage || socioAsignado) {
          this.errorBorrarEntidadAsociacionVigenteService.clear();
          if (vehiculo.garage) {
            this.errorBorrarEntidadAsociacionVigenteService.setGarages([
              vehiculo.garage,
            ]);
          }
          if (socioAsignado) {
            this.errorBorrarEntidadAsociacionVigenteService.setSocios([
              socioAsignado,
            ]);
          }
          this.router.navigate(['error/borrarEntidadConAsociaciones']);
        } else {
          this.vehiculoService.deleteVehiculo(vehiculo.matricula).subscribe();
          this.vehiculos = this.vehiculos.filter(
            (vehiculoActual) => vehiculoActual.matricula !== vehiculo.matricula
          );
        }
      });
  }

  borrarZona(zona: ZonaDTO): void {
    let empleadosAsignados: EmpleadoDTO[] | undefined;
    this.zonaService
      .getEmpleadosAsignados(zona.letra)
      .subscribe((empleadosAsignadosModel) => {
        if(empleadosAsignadosModel){
          empleadosAsignados = this.empleadosConverter.convertirEmpleados(
            empleadosAsignadosModel
          );
        }
        if (empleadosAsignados?.length || zona.garages?.length) {
          this.errorBorrarEntidadAsociacionVigenteService.clear();
          if (empleadosAsignados?.length) {
            this.errorBorrarEntidadAsociacionVigenteService.setEmpleados(
              empleadosAsignados
            );
          }
          if (zona.garages?.length) {
            this.errorBorrarEntidadAsociacionVigenteService.setGarages(
              zona.garages
            );
          }
          this.router.navigate(['error/borrarEntidadConAsociaciones']);
        } else {
          this.zonaService.deleteZona(zona.letra).subscribe();
          this.zonas = this.zonas.filter(
            (zonaActual) => zonaActual.letra !== zona.letra
          );
        }
      });
  }

  editarAdministrador(id: number): void {
    this.router.navigate(['editar', 'administrador', id, 'campos']);
  }

  editarEmpleado(codigo: number): void {
    this.router.navigate(['editar', 'empleado', codigo]);
  }

  editarGarage(numeroGarage: number): void {
    this.router.navigate(['editar', 'garage', numeroGarage, 'campos']);
  }

  editarSocio(dni: number): void {
    this.router.navigate(['editar', 'socio', dni]);
  }

  editarVehiculo(matricula: string): void {
    this.router.navigate(['editar', 'vehiculo', matricula]);
  }

  editarZona(letra: string): void {
    this.router.navigate(['editar', 'zona', letra]);
  }

}
