import { Component, OnInit, Input, ViewChild,TemplateRef ,inject, ElementRef, AfterViewInit     } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { IncidenciaService } from '../services/incidencia.service';
import { Ticket } from '../interfaces/ticket';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Estatus } from '../interfaces/estatus';


@Component({
  selector: 'app-editar-incidencia',
  templateUrl: './editar-incidencia.component.html',
  styleUrls: ['./editar-incidencia.component.css']
})
export class EditarIncidenciaComponent implements OnInit {
  ticketId: string = '';
  mis_tickets : Ticket[] = [];
  estatus: Estatus[] = [];
  @Input() statuses: any[] = [];
  @ViewChild('content') modalContent!: ElementRef;
  private ngAfterViewInitCompleted = false;
  private modalService = inject(NgbModal);
  id_ticket_estatus: number = 0;
  id_estatus_ticket: number = 0;
	closeResult = '';

  constructor(private route: ActivatedRoute, private incidenciaService: IncidenciaService){}

  ngAfterViewInit() {
    this.ngAfterViewInitCompleted = true;
  }


  ngOnInit(){
    
    this.route.params.subscribe(params => {
      this.ticketId = params['id'];
      
      this.incidenciaService.getTicketById(this.ticketId).subscribe(
        (data: Ticket | Ticket[]) =>{
          if (Array.isArray(data) && data.length > 0) {
            this.mis_tickets = data;
          }else if (!Array.isArray(data)) {
            this.mis_tickets = [data];
          }else {
            console.log('No se encontraron tickets para el id');
          }
          console.log(this.mis_tickets);
          
           // Obtener el id_ticket_estatus más alto y su correspondiente id_estatus
           const maximos = this.mis_tickets.reduce((maximos, ticket) => {
            if (ticket.estatus) {
                ticket.estatus.forEach(est => {
                    if (est.id_ticket_estatus > maximos.id_ticket_estatus) {
                        maximos.id_ticket_estatus = est.id_ticket_estatus;
                        maximos.id_estatus = est.estatus_info.id_estatus;
                    }
                });
            }
            return maximos;
        }, { id_ticket_estatus: -Infinity, id_estatus: undefined as number | undefined });
        this.id_ticket_estatus = maximos.id_ticket_estatus;
        this.id_estatus_ticket = maximos.id_estatus !== undefined ? maximos.id_estatus : 0;
        console.log("estatus_ticket"+this.id_estatus_ticket);
        },
        (error)=>{
          console.log("Error al obtener el ticket", error);
        }
      );

    })


    this.incidenciaService.getStatus().subscribe(
      (data: Estatus | Estatus[]) =>{
        if (Array.isArray(data)) {
          this.estatus = data;
        } else {
          this.estatus = [data];
        }
      },
      (error)=>{
        console.log("Error al obtener el ticket", error);
      }
        
    )
  }


  public mostrarModal(content: TemplateRef<any>)
  {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
  }

  private getDismissReason(reason: any): string {
		return reason;
	}

  imprimir() {
    if (!this.modalContent) {
      console.error('Error: modalContent no está definido.');
      return;
    }
    
     // Acceder al contenido del modal
     const modalContent = this.modalContent.nativeElement.innerHTML;
    console.log(modalContent);

  // Abrir una nueva ventana de impresión
  const ventanaImpresion = window.open('', '_blank');

  if (ventanaImpresion) {
    // Escribir el contenido del modal en la nueva ventana
    ventanaImpresion.document.write(modalContent);

    // Imprimir la nueva ventana
    ventanaImpresion.print();
  } else {
    console.error('No se pudo abrir la ventana de impresión.');
  }
  }

}
