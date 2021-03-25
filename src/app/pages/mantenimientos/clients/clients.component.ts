import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../models/cliente.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { ClienteService } from '../../../services/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit {

  public nuevoCliente = true;
  public editarCliente = false;
  public clientes: Cliente[] = [];
  public clientesTemp: Cliente[] = [];
  public totalClientes: number;
  public desde: number = 0;
  public cargando = true;
  public editingClienteId: string;
  public editingClienteRole: string;

  public formSubmitted = false;

  public clientRegisterForm: FormGroup;


  constructor( 
                private fb: FormBuilder, 
                public userService: UsersService,
                public clientService: ClienteService,
                private busquedaSerivce: BusquedasService ) { 
                  this.formulario();
                  this.cargarClientes();
                  this.cargando = true;
                }

  logOut() {
    localStorage.removeItem('token');
  }

  formulario() {

    this.clientRegisterForm = this.fb.group({
      nit: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: [ '', [Validators.required, Validators.email] ],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      activo: [true, Validators.required],
      terminos: [ true, Validators.required ]
    });
  }


  crearCliente() {
    this.editarCliente = false;
    this.formSubmitted = true;


    if( this.clientRegisterForm.invalid ) {
      return;
    }

    // Realizar Posteo
    this.clientService.crearCliente( this.clientRegisterForm.value )
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
    if( this.clientRegisterForm.get(campo).invalid && this.formSubmitted ) {
      return true;
    }
    else {
      return false;
    }
  }



  aceptaTerminos() {
    return !this.clientRegisterForm.get('terminos').value && this.formSubmitted;
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


  cargarClientes( ){
    this.clientService.cargarClientes( this.desde )
    // this.userService.cargarUsuarios( this.desde  )
      .subscribe( (resp: any) => {
        console.log(resp);
        this.clientes = resp.usuarios;
        this.clientesTemp = resp.usuarios;
        this.totalClientes = resp.total;
        
      this.cargando = false;
      });
  }

  cambiarPagina( valor: number ) {
    this.desde += valor;

    if ( this.desde < 0 ) {
      this.desde = 0;
    } else if ( this.desde >= this.totalClientes ) {
      this.desde -= valor; 
    }

    this.cargarClientes();
  }

  buscar( termino: string) {
    if( termino.length === 0) {
      return this.clientes = [ ...this.clientesTemp ];
    }

    this.busquedaSerivce.buscar( 'clientes', termino)
      .subscribe( (resp: Cliente[]) => {
        this.clientes = resp;
      }
      );
  }


  eliminarCliente( cliente: Cliente ) {
  this.editarCliente = false;
  if ( cliente._id === this.userService.uid ){
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
      title: 'Delete client: ' + cliente.nombre + 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {

      if(result.value) {
        
        if (result.isConfirmed) {
          
          this.userService.eliminarCliente( cliente )
            .subscribe( resp => {              
              swal.fire(
              'Deleted!',
              'Client has been deleted.',
              'success'
              )

              this.cargarClientes();
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

  modificarCliente( client: Cliente ) {

      console.log(this.clientRegisterForm.value, client);
      
    this.userService.guardarCliente( client )
      .subscribe(
        resp => {
          console.log(resp);
          this.cargarClientes()
        }
      );
  }



  cargarCliente(cliente: Cliente) {
    this.editingClienteId = cliente._id;
    
    this.editarCliente = true;
    this.clientRegisterForm = this.fb.group({
      nit: [cliente.nit, Validators.required],
      nombre: [cliente.nombre, Validators.required],
      apellido: [cliente.apellido, Validators.required],
      email: [cliente.email, [Validators.required, Validators.email] ],
      telefono: [cliente.telefono, Validators.required],
      direccion: [cliente.direccion, Validators.required],
      activo: [true, Validators.required],
      terminos: [ true, Validators.required ]
    });
  }

}
