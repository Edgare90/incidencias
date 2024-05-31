import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RegistroComponent } from './registro/registro.component';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EditarUsuariosComponent } from './editar-usuarios/editar-usuarios.component';
import { MatSnackBarModule  } from '@angular/material/snack-bar';
import { ListarPefilesComponent } from './listar-pefiles/listar-pefiles.component';
import { ListarIncidenciaComponent } from './listar-incidencia/listar-incidencia.component';
import { RecargaPerfilesService } from './services/recarga-perfiles.service';
import { ListarDepartamentosComponent } from './listar-departamentos/listar-departamentos.component';
import { AgregarDepartamentosComponent } from './agregar-departamentos/agregar-departamentos.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AgregarIncidenciaComponent } from './agregar-incidencia/agregar-incidencia.component';
import { EditarIncidenciaComponent } from './editar-incidencia/editar-incidencia.component';
import { MisTicketsComponent } from './mis-tickets/mis-tickets.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LightboxComponent } from './lightbox/lightbox.component';
import { MenuComponent } from './menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    ListarUsuariosComponent,
    EditarUsuariosComponent,
    ListarPefilesComponent,
    ListarDepartamentosComponent,
    AgregarDepartamentosComponent,
    AgregarIncidenciaComponent,
    EditarIncidenciaComponent,
    MisTicketsComponent,
    LightboxComponent,
    MenuComponent,
    ListarIncidenciaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    NgxPaginationModule,
    MatPaginatorModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  exports: [
    LightboxComponent 
  ],
  providers: [
    RecargaPerfilesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
