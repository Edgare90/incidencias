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

    form: FormGroup = this.formulario.group({
      email: ['',Validators.required],
      password: ['', Validators.required]
    })

    submit()
    {
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
