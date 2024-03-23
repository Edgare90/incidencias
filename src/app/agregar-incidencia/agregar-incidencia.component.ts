import { Component, OnInit } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { Perfiles } from '../interfaces/perfiles';
import { Departamentos } from '../interfaces/departamentos';
import { Ticket } from '../interfaces/ticket';
import { TicketArchivo } from '../interfaces/ticket-archivo';
import { TicketComentario } from '../interfaces/ticket-comentario';
import { TicketEstatus } from '../interfaces/ticket-estatus';
import { UsuarioService } from '../services/usuario.service';
import { DepartamentoService } from '../services/departamento.service';
import { IncidenciaService } from '../services/incidencia.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsyncValidatorFn } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';
import { debounceTime, map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-agregar-incidencia',
  templateUrl: './agregar-incidencia.component.html',
  styleUrls: ['./agregar-incidencia.component.css']
})
export class AgregarIncidenciaComponent implements OnInit {
    myForm: FormGroup;
    datosDepartamentos: Departamentos[] = [];

    constructor(private formulario: FormBuilder, private deptoService: DepartamentoService, private incidenciaSerive: IncidenciaService,private snackBar: MatSnackBar)
    {
      this.myForm = this.formulario.group({
        dirigidoA: ['', Validators.required],
        comentario: ['', Validators.required],
        files: [null,Validators.required]
      });
    }


    ngOnInit() {
      
      this.deptoService.getDepartamentos().subscribe(
        (data) =>{
          this.datosDepartamentos = data;
        },
        (error) =>{
          console.log('Error al cargar departamentos',error);
        }
      )


    }


    onSubmit()
    {
     
      Object.keys(this.myForm.controls).forEach(controlName => {
        this.myForm.get(controlName)?.markAsTouched();
      });

      if(this.myForm.valid)
      {
      
        const idUsuario = localStorage.getItem('id_usuario') || '';
        const formData = new FormData();
        formData.append('id_usuario', idUsuario);
        formData.append('dirigidoA', this.myForm.get('dirigidoA')?.value);
        formData.append('comentario', this.myForm.get('comentario')?.value);

        const files = this.myForm.get('files')?.value;
        for (let i = 0; i < files.length; i++) {
          formData.append('files[]', files[i]);
        }
        console.log(formData);
        this.incidenciaSerive.guardarTicket(formData).subscribe(
          (response) => {
            this.snackBar.open(response.mensaje, 'Cerrar',{
              duration: 3000,
            });
            this.myForm.reset();
          },
          (error) => {
            console.error(error);
          }
        )
      }
    }

    onFileSelected(event: any)
    {
      const files = event.target.files;
      this.myForm.patchValue({ files: files });
    }

    fileExtensionValidator(allowedExtensions: string[]) {
      return (control: any) => {
        if (!control.value) {
          return null; // No hay archivo seleccionado, no hay error
        }
  
        const fileExtension = control.value[0].name.split('.').pop().toLowerCase();
  
        if (allowedExtensions.indexOf(fileExtension) === -1) {
          return { invalidExtension: true }; // Error si la extensión no está permitida
        }
  
        return null; // Archivo válido
      };
    }

    resetComentarioTouched(){
      const comentarioControl = this.myForm.get('comentario');
      if (comentarioControl) {
        comentarioControl.markAsUntouched();
      }
    }
}
