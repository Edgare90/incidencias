import { Component, OnInit } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { Perfiles } from '../interfaces/perfiles';
import { UsuarioService } from '../services/usuario.service';
import { DepartamentoService } from '../services/departamento.service';
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
import { Departamentos } from '../interfaces/departamentos';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  datosUsuario: Usuario[] = [];
  datosPerfiles: Perfiles[] = [];
  datosDepartamentos: Departamentos[] = [];
  usuarioExistente: boolean = false; // Agrega esta línea
  myForm: FormGroup;


  constructor(private usuarioServices : UsuarioService, private http: HttpClient,private formulario: FormBuilder, private snackBar: MatSnackBar,private router: Router, private departamentoService : DepartamentoService){
    
    this.myForm = this.formulario.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
      perfil: [null, Validators.required],
      email:['', [Validators.required, Validators.email]],
      departamento:['',[Validators.required]]
    });


  }
  
  ngOnInit(): void {
    this.usuarioServices.getPeriles().subscribe(
      (data) =>{
        this.datosPerfiles = data;
      },
      (error) =>{
        console.error('Error al cargar los perfiles', error);
      }
      );

     this.departamentoService.getDepartamentos().subscribe(
        (data) =>{
          this.datosDepartamentos = data;
        },
        (error) =>{
          console.log('Error al cargar departamentos',error);
        }
     )

  }

  onSubmit(){
    if(this.myForm.valid)
      {
        const usuarioData = this.myForm.value;
        this.usuarioServices.guardarUsuario(usuarioData).subscribe(
          (respuesta) => {
            this.snackBar.open(respuesta.mensaje, 'Cerrar',{
              duration: 3000,
            });
            this.myForm.reset();
          },
          (error) => {
            console.log('Error al insertar:', error);
          }
        );
      }
  }

  /*
  verificarUsuarioExistenteAsync(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const usuario = control.value;

      return this.usuarioServices.verificarUsuarioExistente(usuario).pipe(
        map(existe => (existe ? { usuarioExistente: true } : null)),
        catchError(() => of(null))
      );
    };
  }*/

  validarUsuarioExistente()
  {
    //console.log("llego aqui");
    const usuario = this.myForm.get('usuario')?.value;
    this.usuarioServices.verificarUsuarioExistente(usuario).subscribe(
      existe =>{
        if (existe === true) {
          this.myForm.get('usuario')?.setErrors({ 'usuarioExistente': true });
        }
      }, 
      error => console.error('Error en la solicitud de verificación:', error)
    );
  }



}
