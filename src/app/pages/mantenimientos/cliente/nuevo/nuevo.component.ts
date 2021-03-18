import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {

  formCliente:FormGroup;
  constructor(public clienteService:ClienteService, public router:Router,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.ValidarFormulario();
  }

  ValidarFormulario(){
    this.formCliente=this.formBuilder.group({
      nombre:['',Validators.required],
      apellido:['', Validators.required],
      email:['',Validators.required],
      direccion:['', Validators.required],
      nit:['', Validators.required],
      telefono:['',Validators.required]
    })
  }

  NuevoCliente(){
    this.clienteService.crearCliente(this.formCliente.value).subscribe(
      response=>{
        console.log('response');
        Swal.fire('Creado:', 'Usuario Creado Correctamente', 'success');
        this.router.navigateByUrl('cliente');
      },
      error=>{
        Swal.fire('Error: ', error.error.msg, 'error');
      }
    )
  }




}
