import { Component, OnInit } from '@angular/core';
import { IncidenciaService } from '../services/incidencia.service';
import { Ticket } from '../interfaces/ticket';
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
   itemsPerPage: number = 5;
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
