import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {SocioComponent} from './socio/socio.component';
import {EmpleadoComponent} from './empleado/empleado.component';
import {GarageComponent} from './garage/garage.component';
import {AdministradorComponent} from './administrador/administrador.component';
import {VehiculoComponent} from './vehiculo/vehiculo.component';
import {ZonaComponent} from './zona/zona.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule,} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';

import {HttpClientModule} from '@angular/common/http';
import {VistaAdministradorComponent} from './vista.administrador/vista.administrador.component';
import {VistaEmpleadoComponent} from './vista.empleado/vista.empleado.component';
import {VistaSocioComponent} from './vista.socio/vista.socio.component';

import {MatIconModule} from '@angular/material/icon';
import {AdministradorCreadorComponent} from './administrador.creador/administrador.creador.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {EmpleadoCreadorComponent} from './empleado.creador/empleado.creador.component';
import {GarageCreadorComponent} from './garage.creador/garage.creador.component';
import {SocioCreadorComponent} from './socio.creador/socio.creador.component';
import {VehiculoCreadorComponent} from './vehiculo.creador/vehiculo.creador.component';
import {ZonaCreadorComponent} from './zona.creador/zona.creador.component';
import {AdministradorEditorComponent} from './administrador-editor/administrador-editor.component';
import {EmpleadoEditorComponent} from './empleado-editor/empleado-editor.component';
import {GarageEditorComponent} from './garage-editor/garage-editor.component';
import {SocioEditorComponent} from './socio-editor/socio-editor.component';
import {VehiculoEditorComponent} from './vehiculo-editor/vehiculo-editor.component';
import {ZonaEditorComponent} from './zona-editor/zona-editor.component';
import {SeleccionarEditorEmpleadoComponent} from './seleccionar-editor-empleado/seleccionar-editor-empleado.component';
import {SeleccionarEditorSocioComponent} from './seleccionar-editor-socio/seleccionar-editor-socio.component';
import {SeleccionarEditorZonaComponent} from './seleccionar-editor-zona/seleccionar-editor-zona.component';
import {
  EditorAsociacionesEmpleadoZonaComponent
} from './editor-asociaciones-empleado-zona/editor-asociaciones-empleado-zona.component';
import {
  EditorAsociacionesZonaEmpleadoComponent
} from './editor-asociaciones-zona-empleado/editor-asociaciones-zona-empleado.component';
import {
  EditorAsociacionesSocioVehiculoComponent
} from './editor-asociaciones-socio-vehiculo/editor-asociaciones-socio-vehiculo.component';
import {
  EditorAsociacionesSocioGarageComponent
} from './editor-asociaciones-socio-garage/editor-asociaciones-socio-garage.component';
import {
  EditorAsociacionesZonaGarageComponent
} from './editor-asociaciones-zona-garage/editor-asociaciones-zona-garage.component';
import {LoginComponent} from './login/login.component';
import {
  EditorAsociacionesVehiculoGarageComponent
} from './editor-asociaciones-vehiculo-garage/editor-asociaciones-vehiculo-garage.component';
import {SeleccionarEditorVehiculoComponent} from './seleccionar-editor-vehiculo/seleccionar-editor-vehiculo.component';
import {
  ErrorBorrarEntidadAsociacionVigenteComponent
} from './error-borrar-entidad-asociacion-vigente/error-borrar-entidad-asociacion-vigente.component';
import {KeyValuePipe} from '@angular/common';
import {
  EditorCantidadVehiculosEncargadosEmpleadoComponent
} from './editor-cantidad-vehiculos-encargados-empleado/editor-cantidad-vehiculos-encargados-empleado.component';
import {MomentDateAdapter,} from '@angular/material-moment-adapter';
import {
  ErrorCrearEntidadExistenteComponent
} from './error-crear-entidad-existente/error-crear-entidad-existente.component';
import { LicensesComponent } from './licenses/licenses.component';

export const FORMATOS_FECHAS = {
  parse: {
    dateInput: 'D-M-YYYY',
  },
  display: {
    dateInput: 'D-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    SocioComponent,
    EmpleadoComponent,
    GarageComponent,
    AdministradorComponent,
    VehiculoComponent,
    ZonaComponent,
    VistaAdministradorComponent,
    VistaEmpleadoComponent,
    VistaSocioComponent,
    AdministradorCreadorComponent,
    EmpleadoCreadorComponent,
    GarageCreadorComponent,
    SocioCreadorComponent,
    VehiculoCreadorComponent,
    ZonaCreadorComponent,
    AdministradorEditorComponent,
    EmpleadoEditorComponent,
    GarageEditorComponent,
    SocioEditorComponent,
    VehiculoEditorComponent,
    ZonaEditorComponent,
    SeleccionarEditorEmpleadoComponent,
    SeleccionarEditorSocioComponent,
    SeleccionarEditorZonaComponent,
    EditorAsociacionesEmpleadoZonaComponent,
    EditorAsociacionesZonaEmpleadoComponent,
    EditorAsociacionesSocioVehiculoComponent,
    EditorAsociacionesSocioGarageComponent,
    EditorAsociacionesZonaGarageComponent,
    LoginComponent,
    EditorAsociacionesVehiculoGarageComponent,
    SeleccionarEditorVehiculoComponent,
    ErrorBorrarEntidadAsociacionVigenteComponent,
    EditorCantidadVehiculosEncargadosEmpleadoComponent,
    ErrorCrearEntidadExistenteComponent,
    LicensesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    HttpClientModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    KeyValuePipe,
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'es-AR',
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    {provide: MAT_DATE_FORMATS, useValue: FORMATOS_FECHAS},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
