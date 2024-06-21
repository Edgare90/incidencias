import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  private rutasPorDepartamento: { [id_departamento: number]: string[] } = {
    1: ['/registro', '/listar-usuarios', '/editar-usuario/:id', '/lista-perfiles', '/agregar-departamentos', '/mis-tickets', '/editar-incidencia/:id', '/agrega-ticket', '/tickets-depto'],
    2: ['/mis-tickets', '/editar-incidencia/:id', '/tickets-depto','/agrega-ticket'],
    3: ['/mis-tickets', '/editar-incidencia/:id', '/tickets-depto','/agrega-ticket'],
    4: ['/mis-tickets', '/editar-incidencia/:id', '/tickets-depto','/agrega-ticket'],
  };

  obtenerRutasPermitidas(idDepartamento: number): string[] {
    return this.rutasPorDepartamento[idDepartamento] || [];
  }

  constructor() { }
}
