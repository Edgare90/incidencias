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
    if (this.authService.isLoggedIn()) {
        const userData = this.authService.getUserData();

        if (userData && userData.id_departamento) {
            const idDepartamento = userData.id_departamento;
            const rutasPermitidas = this.permisosService.obtenerRutasPermitidas(idDepartamento);
            const rutaActual = state.url;

            if (rutasPermitidas.includes(rutaActual)) {
                return true;
              } else {
                this.router.navigate(['/unauthorized']);
                return false;
              }
        }
        else {
          // Redirigir a la página de inicio de sesión si falta información del usuario
          this.router.navigate(['/login']);
          return false;
        }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}