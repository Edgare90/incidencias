import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { IncidenciaService } from '../services/incidencia.service';
import { Ticket } from '../interfaces/ticket';
import { Router } from '@angular/router';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-mis-tickets',
  templateUrl: './mis-tickets.component.html',
  styleUrls: ['./mis-tickets.component.css']
})
export class MisTicketsComponent implements OnInit {
  mis_tickets: Ticket[] = [];
  paginatedTickets: Ticket[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;

  constructor(private authService: AuthService, private incidenciaService:IncidenciaService, private router: Router){}
  ngOnInit(){
    const userData = this.authService.getUserData();
    console.log(userData.id_usuario);

    this.incidenciaService.getTicketsByUser(userData.id_usuario).subscribe(
      (data: Ticket | Ticket[]) =>{
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
      (error)=>{
        console.log("Error al obtener los tickets", error);
      }
    );
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




  exportPDF()
  {
    const tableBody = this.mis_tickets.map(ticket => [
      { text: ticket.fecha_alta, alignment: 'left' }, 
      { text: ticket.id_ticket, alignment: 'center' }, 
      { text: ticket.usuario?.usuario || '', alignment: 'left' }
    ]);

    const documentDefinition = {
      content: [
        { text: 'Listado de Tickets', style: 'header' },
        '\n',
        {
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto'],
            body: [
              ['Fecha', 'ID', 'Usuario'],
              ...tableBody
            ]
          }
        }
      ]
      
    };
  
    pdfMake.createPdf(documentDefinition).open();
  }
  
}
