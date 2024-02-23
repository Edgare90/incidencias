import { Component, OnInit } from '@angular/core';
import { Departamentos } from '../interfaces/departamentos';
import { DepartamentoService } from '../services/departamento.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router  } from '@angular/router';

@Component({
  selector: 'app-listar-departamentos',
  templateUrl: './listar-departamentos.component.html',
  styleUrls: ['./listar-departamentos.component.css']
})
export class ListarDepartamentosComponent implements OnInit {
  lista_deptos: Departamentos[] = [];
  columnas: string[] = ['Perfil', 'Estatus', 'Acciones'];
  
  constructor(private snackBar: MatSnackBar,private router: Router, private departamentoService: DepartamentoService){}
  
  ngOnInit(): void {
    this.departamentoService.getDepartamentos().subscribe(
      (data) =>{
        this.lista_deptos = data;
      },
      (error) =>{
        console.error('Error al cargar los departamentos', error);
      }
    )
  }

  cambiaEstado(id_departamento:string)
  {
    console.log("aqui");
  }

}
