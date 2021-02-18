import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css'  ]
})
export class LoginComponent implements OnInit {

  formSubmitted: boolean;


  public loginForm = this.fb.group({
    email: ['test@test.com', [ Validators.required, Validators.email ]],
    password: ['0000', [ Validators.required ]]
  });

  constructor( private router: Router, private fb: FormBuilder ) { }

  ngOnInit(): void {
  }

  loginUsuario() {
    // this.router.navigateByUrl('/');
    this.formSubmitted = true;
    console.log( this.loginForm.value ); 

    if ( this.loginForm.valid ) {
      console.log('Formulario posteado');
    }
    else {
      console.log('Formulario Inválido');
      
    }
  }

  campoNoValido( campo: string): boolean {
      
    if( this.loginForm.get(campo).invalid && this.formSubmitted ) {
      return true;
    }
    else {
      return false;
    }
  }

}
