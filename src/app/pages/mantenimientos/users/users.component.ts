import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {

  nuevoUsuario: false;

  public formSubmitted = false;

  public registerForm = this.fb.group({
    name: ['Rudy', Validators.required],
    email: [ 'test1@test.com', [Validators.required, Validators.email] ],
    password: [ '0000', Validators.required ],
    password2: [ '0000', Validators.required ],
    terminos: [ true, Validators.required ]
  }, {
    validators: this.passwordsIguales('password', 'password2')
  }  );

  constructor( private fb: FormBuilder, private userService: UsersService ) { }

  ngOnInit(): void { }

  crearUsuario() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if( this.registerForm.invalid ) {
      return;
    }

    // Realizar Posteo
    this.userService.crearUsuario( this.registerForm.value )
      .subscribe( (resp) => {
        console.log('Usuario creado');
        console.log(resp);
      }, (err) => {
        Swal.fire('Error: ', err.error.msg, 'error')
        // console.log(err.error);
        
      }
      );
  }

  campoNoValido( campo: string): boolean {
    if( this.registerForm.get(campo).invalid && this.formSubmitted ) {
      return true;
    }
    else {
      return false;
    }
  }

  contraseniasNoValidas() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if( (pass1 !== pass2) && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }


  aceptaTerminos() {
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  passwordsIguales(pass1: string, pass2: string) {

    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if ( pass1Control.value === pass2Control.value ) {
        pass2Control.setErrors(null);
      }
      else {
        pass2Control.setErrors( {noEsIgual: true} );
      }
    }
  }

}
