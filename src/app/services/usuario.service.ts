import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { Perfiles } from '../interfaces/perfiles';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http: HttpClient) { }

  getPeriles():Observable<Perfiles[]>{
    return this.http.get<Perfiles[]>(`http://127.0.0.1:8000/api/getPerfiles`);
  }

  getUsuarios():Observable<Usuario[]>{
    return this.http.get<Usuario[]>('http://127.0.0.1:8000/api/getUsuarios');
  }

  getUsuarioPorId(id_usuario: string):Observable<Usuario>{
    return this.http.get<Usuario>(`http://127.0.0.1:8000/api/getUsuarioPorId/${id_usuario}`);
  }

  guardarUsuario(usuarioData: any): Observable<any> {
    const url = `http://127.0.0.1:8000/api/guarda-usuario`;
    return this.http.post(url, usuarioData);
  }

  editarUsuario(usuarioId:string, usuarioData: any):Observable<any>{
    const url = `http://127.0.0.1:8000/api/edita-usuario/${usuarioId}`;
    return this.http.put(url, usuarioData);
  }


  verificarUsuarioExistente(usuario: string): Observable<boolean> {
    const url = `http://127.0.0.1:8000/api/verificar-usuario-existente/${usuario}`;
    return this.http.get<boolean>(url);
  }

  verificarCorreoExiste(correo: string):Observable<boolean>{
    const url = `http://127.0.0.1:8000/api/verificar-correo-existente/${correo}`;
    return this.http.get<boolean>(url);
  }
}
