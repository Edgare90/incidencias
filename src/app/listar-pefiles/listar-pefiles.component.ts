import { Component, OnInit } from '@angular/core';
import { Perfiles } from '../interfaces/perfiles';
import { PerfilService } from '../services/perfil.service';
import { RecargaPerfilesService } from '../services/recarga-perfiles.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router  } from '@angular/router';

@Component({
  selector: 'app-listar-pefiles',
  templateUrl: './listar-pefiles.component.html',
  styleUrls: ['./listar-pefiles.component.css']
})
export class ListarPefilesComponent implements OnInit {
  lista_perfiles: Perfiles[] = [];
  columnas: string[] = ['Perfil', 'Estatus', 'Acciones'];

  constructor(private perfilesService:PerfilService,private snackBar: MatSnackBar,private router: Router,private perfilesDataService: RecargaPerfilesService){}

  ngOnInit(): void {
    
    this.perfilesService.getPeriles().subscribe(
      (data) =>{
        this.lista_perfiles = data;
        this.perfilesDataService.actualizarListaPerfiles(data);
      },
      (error) =>{
        console.error('Error al cargar los usuarios', error);
      }
    );

    this.perfilesDataService.listaPerfiles$.subscribe((nuevaLista) => {
      this.lista_perfiles = nuevaLista;
    });

 

  }

  cambiaEstado(idPerfil: string){
    this.perfilesService.cambiaEstatus(idPerfil).subscribe(
      (respuesta) => {
        this.snackBar.open(respuesta.mensaje, 'Cerrar',{
          duration: 3000,
        });

          // Actualiza la lista usando el servicio
          this.perfilesService.getPeriles().subscribe(
            (data) => {
              this.perfilesDataService.actualizarListaPerfiles(data);
            },
            (error) => {
              console.error('Error al cargar los perfiles', error);
            }
          );

      },
      (error) => {
        console.log('Error al insertar:', error);
      }
    )
  }

}
