import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { PermisosService } from './permisos.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router,private permisosService: PermisosService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
   
    const isLoggedIn = this.authService.isLoggedIn();
    console.log('AuthGuard - isLoggedIn:', isLoggedIn);
    if (!isLoggedIn) {
      console.log('AuthGuard - Not logged in, redirecting to login...');
      this.router.navigate(['/login']);
      return false;
    }
  
    const userData = this.authService.getUserData();
  
    if (!userData || !userData.id_departamento) {
      this.router.navigate(['/login']);
      return false;
    }
  
    const idDepartamento = userData.id_departamento;
  
    const rutasPermitidas = this.permisosService.obtenerRutasPermitidas(idDepartamento);
  
    const rutaActual = state.url;
  
    const rutaPermitida = rutasPermitidas.some(permittedRoute => {
      const regex = new RegExp('^' + permittedRoute.replace(/:\w+/g, '([\\w-]+)') + '$');
      return regex.test(rutaActual);
    });
  
  
    if (!rutaPermitida) {
      this.router.navigate(['/unauthorized']);
      return false;
    }
  
    return true;
  }

}