import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecargaPerfilesService {
  private listaPerfilesSubject = new BehaviorSubject<any[]>([]);
  listaPerfiles$ = this.listaPerfilesSubject.asObservable();

  actualizarListaPerfiles(nuevaLista: any[]) {
    console.log(nuevaLista);
    this.listaPerfilesSubject.next(nuevaLista);
  }

  constructor() { }
}
