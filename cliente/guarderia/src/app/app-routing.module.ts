import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradorEditorComponent } from './administrador-editor/administrador-editor.component';
import { AdministradorCreadorComponent } from './administrador.creador/administrador.creador.component';
import { EditorAsociacionesEmpleadoZonaComponent } from './editor-asociaciones-empleado-zona/editor-asociaciones-empleado-zona.component';
import { EditorAsociacionesSocioGarageComponent } from './editor-asociaciones-socio-garage/editor-asociaciones-socio-garage.component';
import { EditorAsociacionesSocioVehiculoComponent } from './editor-asociaciones-socio-vehiculo/editor-asociaciones-socio-vehiculo.component';
import { EditorAsociacionesVehiculoGarageComponent } from './editor-asociaciones-vehiculo-garage/editor-asociaciones-vehiculo-garage.component';
import { EditorAsociacionesZonaEmpleadoComponent } from './editor-asociaciones-zona-empleado/editor-asociaciones-zona-empleado.component';
import { EditorAsociacionesZonaGarageComponent } from './editor-asociaciones-zona-garage/editor-asociaciones-zona-garage.component';
import { EditorCantidadVehiculosEncargadosEmpleadoComponent } from './editor-cantidad-vehiculos-encargados-empleado/editor-cantidad-vehiculos-encargados-empleado.component';
import { EmpleadoEditorComponent } from './empleado-editor/empleado-editor.component';
import { EmpleadoCreadorComponent } from './empleado.creador/empleado.creador.component';
import { ErrorBorrarEntidadAsociacionVigenteComponent } from './error-borrar-entidad-asociacion-vigente/error-borrar-entidad-asociacion-vigente.component';
import { ErrorCrearEntidadExistenteComponent } from './error-crear-entidad-existente/error-crear-entidad-existente.component';
import { GarageEditorComponent } from './garage-editor/garage-editor.component';
import { GarageCreadorComponent } from './garage.creador/garage.creador.component';
import { LoginComponent } from './login/login.component';
import { SeleccionarEditorEmpleadoComponent } from './seleccionar-editor-empleado/seleccionar-editor-empleado.component';
import { SeleccionarEditorSocioComponent } from './seleccionar-editor-socio/seleccionar-editor-socio.component';
import { SeleccionarEditorVehiculoComponent } from './seleccionar-editor-vehiculo/seleccionar-editor-vehiculo.component';
import { SeleccionarEditorZonaComponent } from './seleccionar-editor-zona/seleccionar-editor-zona.component';
import { SocioEditorComponent } from './socio-editor/socio-editor.component';
import { SocioCreadorComponent } from './socio.creador/socio.creador.component';
import { VehiculoEditorComponent } from './vehiculo-editor/vehiculo-editor.component';
import { VehiculoCreadorComponent } from './vehiculo.creador/vehiculo.creador.component';
import { VistaAdministradorComponent } from './vista.administrador/vista.administrador.component';
import { VistaEmpleadoComponent } from './vista.empleado/vista.empleado.component';
import { VistaSocioComponent } from './vista.socio/vista.socio.component';
import { ZonaEditorComponent } from './zona-editor/zona-editor.component';
import { ZonaCreadorComponent } from './zona.creador/zona.creador.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'administrador',
    pathMatch: 'full'
  },
  {
    path: 'administrador',
    component: VistaAdministradorComponent,
  },
  {
    path: 'socio/:dni',
    component: VistaSocioComponent,
  },
  {
    path: 'empleado/:codigo',
    component: VistaEmpleadoComponent,
  },
  {
    path: 'crear/administrador',
    component: AdministradorCreadorComponent,
  },
  {
    path: 'crear/empleado',
    component: EmpleadoCreadorComponent,
  },
  {
    path: 'crear/garage',
    component: GarageCreadorComponent,
  },
  {
    path: 'crear/socio',
    component: SocioCreadorComponent,
  },
  {
    path: 'crear/vehiculo',
    component: VehiculoCreadorComponent,
  },
  {
    path: 'crear/zona',
    component: ZonaCreadorComponent,
  },
  {
    path: 'editar/administrador/:id/campos',
    component: AdministradorEditorComponent,
  },
  {
    path: 'editar/empleado/:codigo',
    component: SeleccionarEditorEmpleadoComponent,
  },
  {
    path: 'editar/empleado/:codigo/campos',
    component: EmpleadoEditorComponent,
  },
  {
    path: 'editar/empleado/:codigo/zonas',
    component: EditorAsociacionesEmpleadoZonaComponent,
  },
  {
    path: 'editar/empleado/:codigo/zonas/cantidadVehiculosAsignados',
    component: EditorCantidadVehiculosEncargadosEmpleadoComponent,
  },
  {
    path: 'editar/vehiculo/:matricula',
    component: SeleccionarEditorVehiculoComponent,
  },
  {
    path: 'editar/garage/:numeroGarage/campos',
    component: GarageEditorComponent,
  },
  {
    path: 'editar/vehiculo/:matricula/garage',
    component: EditorAsociacionesVehiculoGarageComponent,
  },
  {
    path: 'editar/socio/:dni',
    component: SeleccionarEditorSocioComponent,
  },
  {
    path: 'editar/socio/:dni/campos',
    component: SocioEditorComponent,
  },
  {
    path: 'editar/socio/:dni/garages',
    component: EditorAsociacionesSocioGarageComponent,
  },
  {
    path: 'editar/socio/:dni/vehiculos',
    component: EditorAsociacionesSocioVehiculoComponent,
  },
  {
    path: 'editar/vehiculo/:matricula/campos',
    component: VehiculoEditorComponent,
  },
  {
    path: 'editar/zona/:letra',
    component: SeleccionarEditorZonaComponent,
  },
  {
    path: 'editar/zona/:letra/campos',
    component: ZonaEditorComponent,
  },
  {
    path: 'editar/zona/:letra/empleados',
    component: EditorAsociacionesZonaEmpleadoComponent,
  },
  {
    path: 'editar/zona/:letra/garages',
    component: EditorAsociacionesZonaGarageComponent,
  },
  {
    path: 'error/borrarEntidadConAsociaciones',
    component: ErrorBorrarEntidadAsociacionVigenteComponent,
  },
  {
    path: 'error/crearEntidadExistente',
    component: ErrorCrearEntidadExistenteComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
