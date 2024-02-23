import { Component } from '@angular/core';
import { Departamentos } from '../interfaces/departamentos';
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

@Component({
  selector: 'app-agregar-departamentos',
  templateUrl: './agregar-departamentos.component.html',
  styleUrls: ['./agregar-departamentos.component.css']
})
export class AgregarDepartamentosComponent {
  myForm: FormGroup;
  deptoExistente: boolean = false;
  perfiles = ['ACT', 'IN'];

  constructor(private http: HttpClient,private formulario: FormBuilder, private snackBar: MatSnackBar,private router: Router, private departamentoService: DepartamentoService){

    this.myForm = this.formulario.group({
      departamento: ['', Validators.required],
      estatus: ['', Validators.required]
    });

  }


  validarDeptoExistente()
  {}


  onSubmit()
  {
    if(this.myForm.valid)
    {
      const usuarioData = this.myForm.value;
      this.departamentoService.agregaDepto(usuarioData).subscribe(
        (respuesta: any) => {
            this.snackBar.open(respuesta.mensaje, 'Cerrar',{
              duration: 3000,
            });
            this.myForm.reset();
          },
          (error: any) => {
            console.log('Error al insertar:', error);
          }
      )
    }
  }

}
