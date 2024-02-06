import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    constructor(private formulario: FormBuilder){}

    form: FormGroup = this.formulario.group({
      username: ['',Validators.required],
      password: ['', Validators.required]
    })

    submit()
    {
      if(this.form.valid)
      {
        console.log(this.form.value);
      }
    }

}
