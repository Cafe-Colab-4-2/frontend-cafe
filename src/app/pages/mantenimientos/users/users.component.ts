import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsersService } from '../../../services/users.service';
import { Usuario } from '../../../models/usuario.model';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent {

  public nuevoUsuario = true;
  public editarUsuario = false;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public totalUsuarios: number;
  public desde: number = 0;
  public cargando = true;
  public editinUserId: string;

  public formSubmitted = false;

  public registerForm: FormGroup;

  constructor( 
                private fb: FormBuilder, 
                public userService: UsersService,
                private busquedaSerivce: BusquedasService ) { 
                  this.formulario();
                  this.cargarUsuarios();
                  this.cargando = true;
                }

  
  // Logout
  logOut() {
    localStorage.removeItem('token');
  }

  formulario() {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      email: [ '', [Validators.required, Validators.email] ],
      password: [ '', Validators.required ],
      password2: [ '', Validators.required ],
      terminos: [ true, Validators.required ]
    }, {
      validators: this.passwordsIguales('password', 'password2')
    }  );
  }

  crearUsuario() {
    this.editarUsuario = false;
    this.formSubmitted = true;


    if( this.registerForm.invalid ) {
      return;
    }

    // Realizar Posteo
    this.userService.crearUsuario( this.registerForm.value )
      .subscribe( (resp) => {
        console.log('Usuario creado');
        console.log(resp);
        Swal.fire('Creado:', 'Usuario Creado Correctamente', 'success');

        // Se oculta el formulario si el usuario fue creado correctamente
        // this.nuevoUsuario = false;

      }, (err) => {
        Swal.fire('Error: ', err.error.msg, 'error');
        console.log(err.error);
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


  cargarUsuarios( ){
    this.userService.cargarUsuarios( this.desde  )
      .subscribe( resp => {
        console.log(resp);
        this.usuarios = resp.usuarios;
        this.usuariosTemp = resp.usuarios;
        this.totalUsuarios = resp.total;
        
      this.cargando = false;
      });
  }

  cambiarPagina( valor: number ) {
    this.desde += valor;

    if ( this.desde < 0 ) {
      this.desde = 0;
    } else if ( this.desde >= this.totalUsuarios ) {
      this.desde -= valor; 
    }

    this.cargarUsuarios();
  }

  buscar( termino: string) {
    if( termino.length === 0) {
      return this.usuarios = [ ...this.usuariosTemp ];
    }

    this.busquedaSerivce.buscar( 'usuarios', termino)
      .subscribe( resp => {
        this.usuarios = resp
      }
      );
    
  }


  eliminarUsuario( usuario: Usuario ) {
  this.editarUsuario = false;
  if ( usuario._id === this.userService.uid ){
    return Swal.fire('Error: ', 'No esposible auto borrarse', 'error');
  }


    const swal = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swal.fire({
      title: 'Delete user: ' + usuario.nombre + 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {

      if(result.value) {
        
        if (result.isConfirmed) {
          
          this.userService.eliminarUsuario( usuario )
            .subscribe( resp => {              
              swal.fire(
              'Deleted!',
              'User has been deleted.',
              'success'
              )

              this.cargarUsuarios();
            });
          
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
        ) {
          
          swal.fire(
            'Cancelled',
            'User is safe :)',
            'error'
            )
          }
      }
    })
  }

  actualizarPerfil( ) {
    console.log( this.registerForm.value );

    if( this.registerForm.invalid ) {
      return;
    }

    this.userService.actualizarUserPerfil( this.registerForm.value, this.editinUserId )
        .subscribe( resp => {
          Swal.fire('Actualización Correcta', this.registerForm.get('nombre').value, 'success');
          this.cargarUsuarios();
        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        })
    
  }

  cargarUsuario(usuario: Usuario) {
    this.editinUserId = usuario._id;
    console.log('Id Usuario:', this.editinUserId);
    
    this.editarUsuario = true;
    this.registerForm = this.fb.group({
      nombre: [usuario.nombre, Validators.required],
      email: [ usuario.email,  [Validators.required, Validators.email] ],
      password: [ usuario.password, Validators.required ],
      password2: [ usuario.password, Validators.required ],
      terminos: [ true ]
    }, {
      validators: this.passwordsIguales('password', 'password2')
    } );
  }

}
