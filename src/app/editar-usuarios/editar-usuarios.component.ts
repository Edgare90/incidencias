import { Component, OnInit } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { Perfiles } from '../interfaces/perfiles';
import { Departamentos } from '../interfaces/usuario';
import { UsuarioService } from '../services/usuario.service';
import { DepartamentoService } from '../services/departamento.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-usuarios',
  templateUrl: './editar-usuarios.component.html',
  styleUrls: ['./editar-usuarios.component.css']
})
export class EditarUsuariosComponent implements OnInit {
  usuarioId: string = '';
  datosPerfiles: Perfiles[] = [];
  datosDepartamentos: Departamentos[] = [];
  myForm: FormGroup;
  usuarioExistente: boolean = false;

  constructor(private route: ActivatedRoute, private usuarioService: UsuarioService,private formulario: FormBuilder, private snackBar: MatSnackBar,private router: Router, private deptoService : DepartamentoService){
    this.myForm = this.formulario.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
      perfil: [null, Validators.required],
      email:['', [Validators.required, Validators.email]],
      estatus: ['',[Validators.required]],
      departamento:['',[Validators.required]]
    });
  }
  
  
  ngOnInit(): void {

    this.usuarioService.getPeriles().subscribe(
      (data) =>{
        this.datosPerfiles = data;
      },
      (error) =>{
        console.error('Error al cargar los perfiles', error);
      }
      );

      this.deptoService.getDepartamentos().subscribe(
        (data)=>{
          this.datosDepartamentos = data;
        },
        (error) =>{
          console.log("Error al cargar departamentos", error);
        }
      )

    this.route.params.subscribe(params => {
        this.usuarioId = params['id'];
        console.log(this.usuarioId);
        this.usuarioService.getUsuarioPorId(this.usuarioId).subscribe(
          (data : Usuario) =>{
            if (data) {
              this.myForm.patchValue({
                usuario: data.usuario,
                email: data.email
              });
              const perfilId = data.perfil;
              const estatusId = data.estatus;
              const deptoNumber = data.id_departamento;
              this.myForm.get('perfil')?.setValue(Number(perfilId));
              this.myForm.get('estatus')?.setValue(estatusId);
              this.myForm.get('departamento')?.setValue(Number(deptoNumber));
            }else
            {
              console.log("No se encontraron datos del usuario");
            }
          },
          (error) =>
          {
            console.log("Error al cargar datos del usuario");
          }
        );
     });
  }

  onSubmit()
  {

    Object.keys(this.myForm.controls).forEach(controlName => {
      this.myForm.get(controlName)?.markAsTouched();
    });


    if(this.myForm.valid)
    {
      const usuarioData = this.myForm.value;
      
      const usuario = this.myForm.get('usuario')?.value;
      const email = this.myForm.get('contrasena')?.value;
      const perfil = this.myForm.get('perfil')?.value;
      let enviarFormulario = true;

      this.usuarioService.verificarUsuarioExistente(usuario).subscribe(
        (respuesta) => {
          if(respuesta){
            console.log('Usuario existe:', respuesta);
            this.myForm.get('usuario')?.setErrors({ 'usuarioExistente': true });
            enviarFormulario = false;
          }
          
        },
        (error) => {
          console.error('Error al guardar el usuario:', error);
        }
      )


      this.usuarioService.verificarCorreoExiste(email).subscribe(
        (respuesta) => {
          if(respuesta){
            console.log('Correo Existe:', respuesta);
            this.myForm.get('email')?.setErrors({ 'email': true });
            enviarFormulario = false;
          }
          
        },
        (error) => {
          console.error('Error al guardar el usuario:', error);
        }
      )

      if (enviarFormulario) {
        this.usuarioService.editarUsuario(this.usuarioId,usuarioData).subscribe(
          (respuesta) => {
            this.snackBar.open(respuesta.mensaje, 'Cerrar',{
              duration: 3000,
            });
            this.router.navigate(['/listar-usuarios']);
          },
          (error) => {
            console.log('Error al actualizar:', error);
          }
        );
      }
    }
  }


}
