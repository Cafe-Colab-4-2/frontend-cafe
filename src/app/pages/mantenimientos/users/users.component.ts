import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
    terminos: [ false, Validators.required ]
  });

  constructor( private fb: FormBuilder) { }

  ngOnInit(): void {
  }


  crearUsuario() {
    console.log(this.registerForm.value);
    this.formSubmitted = true;
  }


  campoNoValido( campo: string): boolean {
    if( this.registerForm.get(campo).invalid && this.formSubmitted ) {
      return true;
    }
    else {
      return false;
    }
  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

}
