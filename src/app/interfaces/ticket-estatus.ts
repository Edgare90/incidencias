import { Estatus } from "./estatus";

export interface TicketEstatus {
    id_ticket_estatus: number;
    id_ticket: number;
    estatus_info: Estatus;
    usr: string;
    fecha: Date;
}
