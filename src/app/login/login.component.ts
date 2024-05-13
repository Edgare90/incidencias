import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    constructor(private formulario: FormBuilder,private authService: AuthService, private router:Router){}
    showEmailErrorIcon = false;
    showPassErrorIcon = false;
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
        const { email, password } = this.form.value;
        this.authService.login(email, password).subscribe(
          (response) => {
            console.log('Login successful', response);
            this.router.navigate(['/agrega-ticket']); 
          },
          (error) => {
            console.error('Login failed', error);
            // Manejar errores, mostrar mensajes de error, etc.
          }
        );
      }
    }

}
