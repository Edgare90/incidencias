import { Injectable } from '@angular/core';
import { Perfiles } from '../interfaces/perfiles';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private http: HttpClient) { }
    getPeriles():Observable<Perfiles[]>{
      return this.http.get<Perfiles[]>(`http://127.0.0.1:8000/api/get-perfil-lista`);
    }

    cambiaEstatus(idPerfil:string): Observable<any>
    {
      const url = `http://127.0.0.1:8000/api/edita-perfil`;
      const body = { idPerfil: idPerfil };
      return this.http.put(url, body);
    }

    /*obtener_estatus_distri_forms():Observable<any>
    {
      const headers = new HttpHeaders({
        'Content-Type':'aplication/json'
      })

      const datos = {
        clave1: 'valor1',
        clave2: 'valor2'
      };

      return this.http.post<any>('http://www.shadesdemexico.net/shades/webservices_estatus_distri_form.php/',datos,{headers,withCredentials:true});
    }*/


}

