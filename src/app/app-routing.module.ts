import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';
import { EditarUsuariosComponent } from './editar-usuarios/editar-usuarios.component';
import { ListarPefilesComponent } from './listar-pefiles/listar-pefiles.component';
import { ListarDepartamentosComponent } from './listar-departamentos/listar-departamentos.component';
import { AgregarDepartamentosComponent } from './agregar-departamentos/agregar-departamentos.component';
import { AgregarIncidenciaComponent } from './agregar-incidencia/agregar-incidencia.component';
import { AuthGuard } from './services/auth.guard';
import { MisTicketsComponent } from './mis-tickets/mis-tickets.component';
import { EditarIncidenciaComponent } from './editar-incidencia/editar-incidencia.component';




const routes: Routes = [


  { path: 'login', component: LoginComponent }, // Permitir acceso a la página de inicio de sesión sin autenticación
  {
    path: '',
    canActivate:[AuthGuard],
    children:[
      { path: 'registro', component: RegistroComponent },
      { path: 'listar-usuarios', component:ListarUsuariosComponent  },
      { path:'editar-usuario/:id', component:EditarUsuariosComponent},
      { path:'lista-perfiles', component:ListarPefilesComponent},
      
      { path:'lista-departamentos', component:ListarDepartamentosComponent},
      { path:'agregar-departamentos', component:AgregarDepartamentosComponent},
  
      {path:'agrega-ticket', component:AgregarIncidenciaComponent},
      {path:'mis-tickets', component:MisTicketsComponent},
      {path:'editar-incidencia/:id', component:EditarIncidenciaComponent},
      { path: '**', redirectTo: '/login' }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
