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

  guardarUsuario(usuarioData: any): Observable<any> {
    const url = `http://localhost/api/guarda-usuario`;
    return this.http.post(url, usuarioData);
  }


  verificarUsuarioExistente(usuario: string): Observable<boolean> {
    console.log("Llega aqui");
    const url = `http://localhost/api/verificar-usuario-existente/${usuario}`;
    return this.http.get<boolean>(url);
  }
}
