import { Injectable } from '@angular/core';
import { Departamentos } from '../interfaces/departamentos';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  constructor(private http: HttpClient) { }

  getDepartamentos():Observable<Departamentos[]>{
    return this.http.get<Departamentos[]>(`http://127.0.0.1:8000/api/get-deptos`);
  }

  agregaDepto(deptoData: any): Observable<any> 
  {
      const url = `http://127.0.0.1:8000/api/guarda-depto`;
      return this.http.post(url, deptoData);
  }
}
