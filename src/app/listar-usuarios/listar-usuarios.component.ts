import { Component, OnInit } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {
  
  constructor(private usuarioServicio: UsuarioService, private router: Router){}
     datosUsuario: Usuario[] = [];
     usuariosFiltrados: any[] = [];
     paginaActual = 1;
     itemsPorPagina = 2;
     paginasVisibles = 5;
     terminoBusqueda = '';

     
    
     ngOnInit(): void {
      this.usuarioServicio.getUsuarios().subscribe(
        (data) =>{
          this.datosUsuario = data;
          this.actualizarUsuariosFiltrados();
          console.log(this.datosUsuario);
        },
        (error) =>{
          console.error('Error al cargar los usuarios', error);
        }
        );
    }

    public editarUsuario(usuario: Usuario)
    {
        this.router.navigate(['/editar-usuario', usuario.id_usuario]);
    }

    cambiarPagina(event: any): void {
      this.paginaActual = event;
    }
  
    irPaginaAnterior(): void {
      if (this.paginaActual > 1) {
        this.cambiarPagina(this.paginaActual - 1);
      }
    }
  
    irPrimeraPagina(): void {
      this.cambiarPagina(1);
    }
  
    irPaginaSiguiente(): void {
      const ultimaPagina = Math.ceil(this.datosUsuario.length / this.itemsPorPagina);
      if (this.paginaActual < ultimaPagina) {
        this.cambiarPagina(this.paginaActual + 1);
      }
    }

    irPagina(numeroPagina: number): void {
      this.cambiarPagina(numeroPagina);
    }

    obtenerTotalPaginas(): number {
      return Math.ceil(this.datosUsuario.length / this.itemsPorPagina);
    }

    obtenerRangoPaginas(): number[] {
      const totalPaginas = this.obtenerTotalPaginas();
      const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);

      // Calcula el rango de páginas visibles
      const inicio = Math.max(1, this.paginaActual - Math.floor(this.paginasVisibles / 2));
      const fin = Math.min(inicio + this.paginasVisibles - 1, totalPaginas);

      // Devuelve el rango de páginas visibles
      return paginas.slice(Math.max(0, inicio - 1), fin);
    }

    actualizarUsuariosFiltrados(): void {
      if (this.terminoBusqueda.trim() === '') {
        // Si el término de búsqueda está vacío, mostrar todos los usuarios
        this.usuariosFiltrados = this.datosUsuario;
      } else {
        // Filtrar usuarios según el término de búsqueda
        this.usuariosFiltrados = this.datosUsuario.filter((usuario) =>
          usuario.usuario.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
        );

        console.log(this.usuariosFiltrados);
      }
    }


}
