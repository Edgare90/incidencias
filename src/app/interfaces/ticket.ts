import { TicketArchivo } from "./ticket-archivo";
import { TicketComentario } from "./ticket-comentario";
import { TicketEstatus } from "./ticket-estatus";
import { Usuario } from "./usuario";
import { Departamentos } from "./departamentos";

export interface Ticket {
    id_ticket: number;
    usr_alta: string;
    fecha_alta: Date;
    dirigido_a: string;
    usuario?: Usuario;
    archivos?: TicketArchivo[];
    comentarios?: TicketComentario[];
    estatus?: TicketEstatus[];
    departamentos?: Departamentos[];
}
