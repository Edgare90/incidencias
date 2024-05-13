import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  private rutasPorDepartamento: { [id_departamento: number]: string[] } = {
    1: ['/registro', '/listar-usuarios', '/editar-usuario/:id', '/lista-perfiles', '/agregar-departamentos', '/mis-tickets', '/editar-incidencia:id', '/agrega-ticket'],
    2: ['/registro', '/mis-tickets', 'editar-incidencia:id'],
  };

  obtenerRutasPermitidas(idDepartamento: number): string[] {
    return this.rutasPorDepartamento[idDepartamento] || [];
  }

  constructor() { }
}
