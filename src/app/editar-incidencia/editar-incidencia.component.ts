import { Component, OnInit, Input, ViewChild,TemplateRef ,inject, ElementRef, AfterViewInit, HostListener     } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { IncidenciaService } from '../services/incidencia.service';
import { Ticket } from '../interfaces/ticket';
import {TicketArchivo} from '../interfaces/ticket-archivo'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Estatus } from '../interfaces/estatus';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartamentoService } from '../services/departamento.service';
import { Departamentos } from '../interfaces/departamentos';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger, state, style, animate, transition } from '@angular/animations'
import { TicketComentario } from '../interfaces/ticket-comentario';

@Component({
  selector: 'app-editar-incidencia',
  templateUrl: './editar-incidencia.component.html',
  styleUrls: ['./editar-incidencia.component.css'],
  animations: [
    trigger('scrollAnimation', [
      state('show', style({ opacity: 1 })),
      state('hide', style({ opacity: 0 })),
      transition('show => hide', animate('0.3s')),
      transition('hide => show', animate('0.3s'))
    ]), 
    trigger('fieldAnimation', [
      state('void', style({
        opacity: 0,
        height: 0,
        overflow: 'hidden',
        padding: '0 20px',
        margin: '0'
      })),
      state('*', style({
        opacity: 1,
        height: '*',
        overflow: 'visible',
        padding: '*',
        margin: '*'
      })),
      transition('void <=> *', animate('300ms ease-in-out'))
    ]),
    trigger('fadeInOut', [
      transition(':enter', [  // Alias para void => *
      style({ opacity: 0, transform: 'translateY(-100%)' }),
      animate('500ms cubic-bezier(0.175, 0.885, 0.320, 1.275)', style({ opacity: 1, transform: 'translateY(0)' }))
    ]),
    transition(':leave', [  // Alias para * => void
      animate('300ms ease-in', style({ opacity: 0 }))
    ])
    ])
  ]
})
export class EditarIncidenciaComponent implements OnInit {
  ticketId: string = '';
  mis_tickets : Ticket[] = [];
  estatus: Estatus[] = [];
  posiblesEstatus: Estatus[] = [];
  @Input() statuses: any[] = [];
  @ViewChild('content') modalContent!: ElementRef;
  private ngAfterViewInitCompleted = false;
  private modalService = inject(NgbModal);
  id_ticket_estatus: number = 0;
  id_estatus_ticket: number = 0;
	closeResult = '';
  imagenes: string[] = [];
  lastStatusColor: string = '#000'; 
  @ViewChild('modal') modal?: ElementRef;
  myForm: FormGroup;
  datosDepartamentos: Departamentos[] = [];
  showErrorMessage: boolean = false;
  scrollState = 'hide'; 
  showForm: boolean = false;
  isLoading: boolean = false;
  departamentosIncluidos: number[] = [];
  previousTicketDetails: any[] = [];

 

  constructor(private deptoService: DepartamentoService,private formulario: FormBuilder,private route: ActivatedRoute, private incidenciaService: IncidenciaService,
              private incidenciaSerive: IncidenciaService,private snackBar: MatSnackBar){
    this.myForm = this.formulario.group({
      dirigidoA: ['', Validators.required],
      comentario: ['', Validators.required],
      files: [null, [this.fileExtensionValidator(['jpg', 'png', 'xls', 'doc', 'pdf'])]], 
      derivado: ['', Validators.required]
    });
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const ticketContainer = document.querySelector('.ticket-container');
    if (ticketContainer) {
      const ticketContainerRect = ticketContainer.getBoundingClientRect();
      if (ticketContainerRect.top <= 0) {
        this.scrollState = 'visible';
        this.showForm = true;
      } else {
        this.scrollState = 'hidden';
        this.showForm = false;
      }
    }
  }

  ngAfterViewInit() {
    this.ngAfterViewInitCompleted = true;
  }



  ngOnInit(){

    this.loadData();
    this.route.params.subscribe(params => {
      this.ticketId = params['id'];
    })
  }

  loadData() {
    this.loadDepartamentos();
    this.loadStatus();
    this.loadTicketDetails();
    this.getIncidencia();
  }


  loadDepartamentos() { 
    this.deptoService.getDepartamentos().subscribe(
          (data) =>{
            this.datosDepartamentos = data;
          },
          (error) =>{
            console.log('Error al cargar departamentos',error);
          }
        );
    }
    
    
    loadStatus() {
      this.incidenciaSerive.getStatus().subscribe(
          (data) =>{
            this.posiblesEstatus = data;
          },
          (error)=>{
            console.log('Error al cargar departamentos',error);
          }
        );
    }
    
    
    loadTicketDetails() {
      this.route.params.subscribe(params => {
        this.ticketId = params['id'];
        this.fetchTicketData(this.ticketId);
      });
    }
    
    fetchTicketData(ticketId: string) {
            this.isLoading = true;
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
              
              this.mis_tickets.forEach(ticket => {
                if (ticket.archivos) {
                  ticket.archivos.forEach(archivo => {
                    this.imagenes.push(this.incidenciaService.getImageUrl(archivo.archivo));
                  });
                }
              });
    
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
    
            //obtener los deptos ya involucrados para no permitir volverlos a seleccionar
            if (Array.isArray(data)) {
              data.forEach(ticket => {
                if (ticket.departamentos) {
                  ticket.departamentos.forEach(depto => {
                    const idDepartamento = parseInt(depto.id_departamento, 10);
                    if (!isNaN(idDepartamento)) {
                      this.departamentosIncluidos.push(idDepartamento);
                    }
                  });
                }
              });
            } else {
              if (data.departamentos) {
                data.departamentos.forEach(depto => {
                  const idDepartamento = parseInt(depto.id_departamento, 10);
                  if (!isNaN(idDepartamento)) {
                    this.departamentosIncluidos.push(idDepartamento);
                  }
                });
              }
            }
            
    
            this.handleTicketData(data);

            console.log("hay ticket anterior"+this.mis_tickets[0].ticket_anterior)

            if (this.mis_tickets[0] && this.mis_tickets[0].ticket_anterior) {
              let ticketAnteriorString = this.mis_tickets[0].ticket_anterior.toString();
              this.fetchPreviousTicketsData(ticketAnteriorString);
            }
            this.isLoading = false;
            },
            (error)=>{
              console.log("Error al obtener el ticket", error);
            }
          );
    }


    fetchPreviousTicketsData(ticketId: string) {
      this.incidenciaService.getTicketById(ticketId).subscribe(
        (responseData: any) => {
          if (!Array.isArray(responseData) || responseData.length === 0) {
            console.error('No se encontraron datos para el ticket anterior:', ticketId);
            return;
          }
    
          const previousData = responseData[0];
          console.log("Datos del ticket anterior:", previousData);
    
          // Procesar y mapear imágenes
          const archivosUrls = previousData.archivos ? previousData.archivos.map((archivo: TicketArchivo) => {
            return {
              url: this.incidenciaService.getImageUrl(archivo.archivo),
              nombre: archivo.archivo  // Suponiendo que 'archivo' tiene una propiedad 'archivo' que es el nombre del archivo
            };
          }) : [];
    
          // Procesar comentarios
          const comentarios = previousData.comentarios ? previousData.comentarios.map( (comentario: TicketComentario) => {
            return {
              comentario: comentario.comentario,
              fecha_comentario: comentario.fecha_comentario,
              usuario: comentario.usuario ? comentario.usuario.usuario : "Anónimo"
            };
          }) : [];
    
          console.log("Comentarios procesados:", comentarios);
          console.log("URLs de archivos:", archivosUrls);
    
          const extractedData = {
            ticketId: previousData.id_ticket,
            comentarios: comentarios,
            archivos: archivosUrls
          };
    
          console.log("Extracted Data:", extractedData);
          this.previousTicketDetails.push(extractedData);
    
          // Si hay un ticket anterior, seguir buscando
          if (previousData.ticket_anterior && previousData.ticket_anterior > 0) {
            this.fetchPreviousTicketsData(previousData.ticket_anterior.toString());
          }
        },
        error => console.error("Error al obtener el ticket anterior", error)
      );
    }
    
    getIncidencia()
    {
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

  getStatusColor(id_estatus: number): string {
    switch(id_estatus) {
      case 1: return '#007BFF'; // Nuevo
      case 2: return '#FFC107'; // En Proceso
      case 3: return '#28A745'; // Finalizado
      default: return '#6C757D'; // Estado desconocido o predeterminado
    }
  }

  handleTicketData(data: Ticket | Ticket[]) {
    if (Array.isArray(data) && data.length > 0) {
      this.mis_tickets = data;
    } else if (!Array.isArray(data)) {
      this.mis_tickets = [data];
    } else {
      console.error('No se encontraron tickets para el id');
      return;
    }
  
    const lastTicket = this.mis_tickets[this.mis_tickets.length - 1];
    const lastStatus = lastTicket.estatus?.[lastTicket.estatus.length - 1];
    if (!lastStatus) {
      console.error('No status available for the last ticket.');
      return;
    }
  
    this.lastStatusColor = this.getStatusColor(lastStatus.estatus_info.id_estatus);
    console.log("Color del último estado: " + this.lastStatusColor);
  }


  ampliarImagen(imagenUrl: string) {
    console.log('Imagen ampliada:', imagenUrl);
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
    
     const modalContent = this.modalContent.nativeElement.innerHTML;
    console.log(modalContent);

  const ventanaImpresion = window.open('', '_blank');

  if (ventanaImpresion) {
    ventanaImpresion.document.write(modalContent);

    ventanaImpresion.print();
  } else {
    console.error('No se pudo abrir la ventana de impresión.');
  }
  }

  getStatusClass(statusDesc: string): string {
    switch(statusDesc) {
      case 'Nuevo':
        return 'status-new'; // Clase para Nuevo
      case 'En Proceso':
        return 'status-in-process'; // Clase para En Proceso
      case 'Finalizado':
        return 'status-finalized'; // Clase para Finalizado
      default:
        return 'status-default'; // Clase por defecto
    }
  }

  mostrarImagen(imagen: string) {
    console.log('Mostrando imagen:', imagen);
    if (this.modal) {
      const contenido = document.getElementById("contenidoModal");
      console.log('Contenido:', contenido);
      if (contenido) {
        contenido.innerHTML = "";
    
        const extension = imagen.split('.').pop();
        console.log('Extension:', extension);
        if (extension === "JPG" || extension === "jpg" || 
            extension === "JPEG" || extension === "jpeg" || 
            extension === "PNG" || extension === "png" || 
            extension === "GIF" || extension === "gif") {
          console.log("Es una imagen")
          const img = document.createElement("img");
          img.src = imagen;
          contenido.appendChild(img);
        } else if (extension === "pdf") {
          console.log("Es un PDF");
          this.descargarArchivo(imagen);
        } else if (extension === "xls" || extension === "xlsx") {
          this.descargarArchivo(imagen);
        }
    
        this.modal.nativeElement.style.display = "block";
      }
    }
  }

  cerrarModal() {
    if (this.modal) {
      this.modal.nativeElement.style.display = "none";
    }
  }

  descargarArchivo(url: string) {
    if (this.modal) {
      this.modal.nativeElement.style.display = "none";
    }
    if (!url) {
      console.error("La URL del archivo es indefinida.");
      return;
    }

  const link = document.createElement('a');
  link.href = url;

  const fileName = url.includes('/') ? url.split('/').pop()! : 'archivo';
  
  link.download = fileName; 
  link.target = "_blank";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

esImagen(nombreArchivo: string): boolean {
  const extension = this.obtenerExtension(nombreArchivo);
  return extension === 'jpg' ||  extension === 'JPG' || extension === 'jpeg' || extension === 'JPEG' || extension === 'png' || extension === 'PNG' || extension === 'gif';
}

esPDF(nombreArchivo: string): boolean {
  const extension = this.obtenerExtension(nombreArchivo);
  return extension === 'pdf';
}

esEXCEL(nombreArchivo: string): boolean{
  const extension = this.obtenerExtension(nombreArchivo);
  return extension === 'xls';
}

obtenerExtension(nombreArchivo: string): string {
  return nombreArchivo.split('.').pop()?.toLowerCase() || '';
}

fileExtensionValidator(allowedExtensions: string[]) {
  return (control: any) => {
    if (!control.value) {
      return null; 
    }

    const fileExtension = control.value[0].name.split('.').pop().toLowerCase();

    if (allowedExtensions.indexOf(fileExtension) === -1) {
      return { invalidExtension: true };
    }

    return null; 
  };
}


onSubmit()
{
  console.log("estoy en el submit de la edicio");
  const dirigidoA = this.myForm.get('dirigidoA')?.value;
  Object.keys(this.myForm.controls).forEach(controlName => {
    this.myForm.get(controlName)?.markAsTouched();
  });

  if(this.myForm.valid)
  {
  
    const derivado = this.myForm.get('derivado')?.value;
    const idUsuario = localStorage.getItem('id_usuario') || '';
    const formData = new FormData();
    
    formData.append('id_usuario', idUsuario);
    formData.append('idTicket',this.ticketId );
    if (Array.isArray(dirigidoA)) {
        dirigidoA.forEach((departamentoId: any) => {
            formData.append('dirigidoA[]', departamentoId);
        });
    } else {
        formData.append('dirigidoA', dirigidoA);
    }
    formData.append('comentario', this.myForm.get('comentario')?.value);

    const files = this.myForm.get('files')?.value;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files[]', files[i]);
      }
    }

    formData.append('derivado', derivado);

    console.log(formData);
    this.incidenciaSerive.editarTicket(formData).subscribe(
      (response) => {
        this.snackBar.open(response.mensaje, 'Cerrar',{
          duration: 3000,
        });
        this.myForm.reset();
        this.loadData();
      },
      (error) => {
        console.error(error);
      }
    )
  }else
  {
    console.log("no pasa la validacion");
  }
}

resetComentarioTouched(){
  const comentarioControl = this.myForm.get('comentario');
  if (comentarioControl) {
    comentarioControl.markAsUntouched();
  }
}

onFileSelected(event: any) {
  const files = event.target.files;
  this.myForm.patchValue({ files: files });
}

isUltimoEstatus(status: any): boolean {
  return status.id_estatus === this.id_estatus_ticket;
}


}
