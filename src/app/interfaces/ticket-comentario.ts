export interface TicketComentario {
    id_ticket_comentario: number;
    id_ticket: number;
    usr: string;
    fecha_comentario: Date;
    comentario: string;
    usuario?: { 
        id_usuario: number;
        usuario: string;
        email:string;
    };
}
