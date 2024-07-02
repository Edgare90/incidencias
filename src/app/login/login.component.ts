import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    constructor(private formulario: FormBuilder,private authService: AuthService, private router:Router,private snackBar: MatSnackBar){}
    showEmailErrorIcon = false;
    showPassErrorIcon = false;
    isLoading = false;
    form: FormGroup = this.formulario.group({
      email: ['',Validators.required],
      password: ['', Validators.required]
    })

    checkEmailError() {
      if (this.form.get('email')?.touched && this.form.get('email')?.hasError('required')) {
        setTimeout(() => {
          this.showEmailErrorIcon = true;
        }, 200);
      } else {
        this.showEmailErrorIcon = false;
      }
    }

    checkPassError() {
      if (this.form.get('password')?.touched && this.form.get('password')?.hasError('required')) {
        setTimeout(() => {
          this.showPassErrorIcon = true;
        }, 200);
      } else {
        this.showPassErrorIcon = false;
      }
    }

    submit()
    {
      this.form.markAllAsTouched();
      
      if(this.form.valid)
      {
        this.isLoading = true; 
        const { email, password } = this.form.value;
        this.authService.login(email, password).subscribe(
          (response) => {
            this.isLoading = false; 
            //console.log('Login successful', response);
            this.snackBar.open(response.message+'. Wait..', 'Cerrar',{
              duration: 1000,
            });
            setTimeout(() => {
              this.router.navigate(['/agrega-ticket']);
            }, 3000); 
          },
          (error) => {
            this.isLoading = false;
            console.error('Login failed', error);
            this.snackBar.open('Error en Usuario y/o contraseña', 'Cerrar', {
              duration: 3000,
            });
          }
        );
      }
    }

}
