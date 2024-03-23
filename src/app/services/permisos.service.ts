import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  private rutasPorDepartamento: { [id_departamento: number]: string[] } = {
    1: ['/registro', '/listar-usuarios', '/editar-usuario/:id', '/lista-perfiles', '/agregar-departamentos', '/mis-tickets', '/editar-incidencia:id'],
    2: ['/registro', '/mis-tickets', 'editar-incidencia:id'],
  };

  obtenerRutasPermitidas(idDepartamento: number): string[] {
    console.log(this.rutasPorDepartamento[idDepartamento] || []);
    return this.rutasPorDepartamento[idDepartamento] || [];
  }

  constructor() { }
}
