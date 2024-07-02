import { Component, OnInit } from '@angular/core';
import { IncidenciaService } from '../services/incidencia.service';
import { Ticket } from '../interfaces/ticket';
import {TicketEstatus} from '../interfaces/ticket-estatus'
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-incidencia',
  templateUrl: './listar-incidencia.component.html',
  styleUrls: ['./listar-incidencia.component.css']
})
export class ListarIncidenciaComponent implements OnInit {
  paginatedTickets: Ticket[] = [];
  mis_tickets: Ticket[] = []; 
   currentPage: number = 1;
   itemsPerPage: number = 10;
   totalPages: number = 0;
  constructor(private incidenciaService: IncidenciaService,private authService: AuthService,private router: Router){
  }


  ngOnInit() {
    const userData = this.authService.getUserData();
    console.log(userData.id_departamento);

    this.incidenciaService.getTicketsByDepto(userData.id_departamento).subscribe(
      (data : Ticket | Ticket[]) => {
        if (Array.isArray(data) && data.length > 0) {
          this.mis_tickets = data;
          this.totalPages = Math.ceil(this.mis_tickets.length / this.itemsPerPage);
          this.updatePage(1);
        }else if (!Array.isArray(data)) {
          this.mis_tickets = [data];
        }else {
          console.log('No se encontraron tickets para el usuario');
        }
        console.log(this.mis_tickets);
      },
      (error) =>
      {

      }
    )
  }

  getIconForTicket(ticket: Ticket): string {
    console.log(ticket);
    let latestStatus: TicketEstatus | null = null;
    let idEstatus: number | null = null;

    if (ticket.estatus && ticket.estatus.length > 0) {
        ticket.estatus.forEach((status) => {
            if (!latestStatus || status.id_ticket_estatus > latestStatus!.id_ticket_estatus) {
              latestStatus = status;
              idEstatus = 'id_estatus' in status ? status['id_estatus'] as number : null;
            }
        });
    }
    

    if (idEstatus === 3) {
      console.log("idEstatus"+idEstatus);
        return 'fas fa-check text-success'; 
    } else {

    if (ticket.usuario) {
      const deptId = parseInt(ticket.usuario.id_departamento, 10);
     
      if (deptId === 4) {
       
        const now = new Date();
        const ticketDate = new Date(ticket.fecha_alta);
        const diff = (now.getTime() - ticketDate.getTime()) / 1000 / 60;
        console.log("diff"+diff);
        if (diff >= 0 && diff <= 60) {
          return 'fas fa-exclamation-circle text-success';
        } else if (diff > 60 && diff <= 180) {
          return 'fas fa-exclamation-triangle text-warning';
        } else if (diff > 180) {
          return 'fa fa-exclamation-triangle text-danger';
        }
      }else{
        const now = new Date();
        const ticketDate = new Date(ticket.fecha_alta);
        const diff = (now.getTime() - ticketDate.getTime()) / 1000 / 60;
        console.log("diff"+diff)
        if (diff > 180) {
          return 'fa fa-exclamation-triangle text-warning';
        }
      }
    }
    return '';
  }
  }


  updatePage(pageNumber: number) {
    this.currentPage = pageNumber;
    const startIndex = (pageNumber - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedTickets = this.mis_tickets.slice(startIndex, endIndex);
  }

  onPrev(event: MouseEvent): void {
    event.preventDefault();
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage(this.currentPage);
    }
  }
  
  onNext(event: MouseEvent): void {
    event.preventDefault();
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePage(this.currentPage);
    }
  }

  editarTicket(idTicket: number)
  {
    console.log(idTicket);
    this.router.navigate(['/editar-incidencia', idTicket]);
  }

}
