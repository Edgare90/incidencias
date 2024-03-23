import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../interfaces/ticket';

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {

  constructor(private http: HttpClient) { }

  guardarTicket(ticketData: any): Observable<any> {
    const url = `http://127.0.0.1:8000/api/guarda-ticket`;
    return this.http.post(url, ticketData);
  }

  getTickets():Observable<any>{
    const url = `http://127.0.0.1:8000/api/obtiene-tickets`;
    return this.http.get(url);
  }


  getTicketsByUser(id_usuario: string):Observable<Ticket>{
    return this.http.get<Ticket>(`http://127.0.0.1:8000/api/obtiene-tickets-user/${id_usuario}`);
  }

  getTicketById(id_ticket: string):Observable<Ticket>{
    return this.http.get<Ticket>(`http://127.0.0.1:8000/api/obtiene-tickets-id/${id_ticket}`);
  }
}
