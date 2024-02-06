import { Component, OnInit } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { Perfiles } from '../interfaces/perfiles';
import { UsuarioService } from '../services/usuario.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsyncValidatorFn } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';
import { debounceTime, map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  datosUsuario: Usuario[] = [];
  datosPerfiles: Perfiles[] = [];
  myForm: FormGroup;


  constructor(private usuarioServices : UsuarioService, private http: HttpClient,private formulario: FormBuilder){
    
    this.myForm = this.formulario.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
      perfil: [null, Validators.required],
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

  }

  onSubmit(){
    if(this.myForm.valid)
      {
        const usuarioData = this.myForm.value;
        this.usuarioServices.guardarUsuario(usuarioData).subscribe(
          (respuesta) => {
            console.log('Usuario guardado con éxito:', respuesta);
          },
          (error) => {
            console.error('Error al guardar el usuario:', error);
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

  usuarioDisponibleValidator(usuarioService: UsuarioService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const usuario = control.value;
      console.log("Entro a la funcion");
      // Evitar realizar validación si el campo está vacío
      if (!usuario) {
        return of(null);
      }
  
      // Retrasar la validación para evitar llamadas frecuentes mientras el usuario está escribiendo
      return of(usuario).pipe(
        debounceTime(20), // Esperar 300 milisegundos después de que el usuario deja de escribir
        switchMap(() => usuarioService.verificarUsuarioExistente(usuario)), // Llamada al servicio
        map(existe => (existe ? { usuarioExistente: true } : null)), // Mapear el resultado al objeto de errores
        catchError(() => of(null)) // Manejar errores
      );
    };
  }

}
