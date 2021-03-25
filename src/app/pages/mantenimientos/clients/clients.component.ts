import { Component } from '@angular/core';
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
export class ClientsComponent{

  public nuevoCliente = true;
  public editarCliente = false;
  public clientes: Cliente[] = [];
  public clientesTemp: Cliente[] = [];
  public editinClient: Cliente;
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
      terminos: [ true, Validators.required ],
      userId: [this.userService.uid, Validators.required ],
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

        this.cargarClientes();

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



  cargarClientes( ){
    this.clientService.cargarClientes( this.desde )
      .subscribe( (resp: any) => {
        console.log(resp);
        this.clientes = resp.clientes;
        this.clientesTemp = resp.clientes;
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
          
          this.clientService.eliminarCliente( cliente )
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

  modificarCliente(cliente: Cliente ) {
    if(cliente === undefined){
      this.clientService.guardarCliente( this.clientRegisterForm.value, this.editingClienteId )
        .subscribe(
          resp => {
            console.log(resp);
            this.cargarClientes()
          }
        );
    } else {
      this.clientService.guardarCliente( cliente, cliente._id )
        .subscribe(
          resp => {
            console.log(resp);
            this.cargarClientes()
          }
        );
    }
  }
  
  cargarCliente(cliente: Cliente) {
    
    this.editarCliente = true;
    this.clientRegisterForm = this.fb.group({
      nit: [cliente.nit, Validators.required],
      nombre: [cliente.nombre, Validators.required],
      apellido: [cliente.apellido, Validators.required],
      email: [cliente.email, [Validators.required, Validators.email] ],
      telefono: [cliente.telefono, Validators.required],
      direccion: [cliente.direccion, Validators.required],
      activo: [true, Validators.required],
      terminos: [ true, Validators.required ],
      userId: [this.userService.uid, Validators.required ],
    });
    
    this.editingClienteId = cliente._id;
    this.editinClient = this.clientRegisterForm.value;
  }

}
