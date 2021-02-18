import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css'  ]
})
export class LoginComponent implements OnInit {

  formSubmitted: boolean;


  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required ]],
    remember: [false]
  });

  constructor( private router: Router, private fb: FormBuilder, private usersService: UsersService ) { }

  ngOnInit(): void {}

 


  loginUsuario() {

    // Realizar Posteo USERS.SERVICE
    this.usersService.logIn( this.loginForm.value )
    .subscribe( (resp) => {

      if( this.loginForm.get('remember').value ){
        localStorage.setItem('email', this.loginForm.get('email').value );
      } else {
        localStorage.removeItem('email');
      }
        console.log('Login correcto');
        console.log(resp);
        Swal.fire('Bienvenido', '', 'success');

        this.router.navigateByUrl('/dashboard');
      
    }, (err) => {
        Swal.fire('Error', err.error.msg, 'error')
        // console.warn('ERROR: ', err.error.errors);
      }
    );

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
