import { Component, OnInit } from '@angular/core';
import { IncidenciaService } from '../services/incidencia.service';
import { Ticket } from '../interfaces/ticket';

@Component({
  selector: 'app-listar-incidencia',
  templateUrl: './listar-incidencia.component.html',
  styleUrls: ['./listar-incidencia.component.css']
})
export class ListarIncidenciaComponent implements OnInit {

   ticketsRegistros : Ticket[] = []; 
  constructor(private incidenciaService: IncidenciaService){
  }


  ngOnInit() {
    this.incidenciaService.getTickets().subscribe(
      (data) =>{
          this.ticketsRegistros = data;
          console.log(this.ticketsRegistros);
      },
      (error) =>
      {
        console.log("Error al obtener los tickets",error);
      }
    )
  }
}
