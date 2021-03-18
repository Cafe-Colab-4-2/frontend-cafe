import { ClienteService } from 'src/app/services/cliente.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  formEditar:FormGroup;
  clienteEncontrado:Cliente;
  formBuilder: any;
  constructor(private activerouter:ActivatedRoute, private router:Router,
              private clienteService:ClienteService) { }

  ngOnInit(): void {
    let cliente=this.activerouter.snapshot.paramMap.get('id');
    this.clienteService.BuscarCliente(cliente).subscribe(data=>{
      console.log(data);
    })
  }

  ValidarFormulario(){
    this.formEditar=this.formBuilder.group({
      nombre:[''],
      apellido:[''],
      email:[''],
      direccion:[''],
      nit:[''],
      telefono:['']
    })
  }

}
