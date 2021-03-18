import { Cliente } from './../../../../models/cliente.models';
import { ClienteService } from './../../../../services/cliente.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  clientes:Cliente[]=[];

  constructor(public clienteService:ClienteService, public router:Router) { }

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes(){
    this.clienteService.MostrarClientes().subscribe(data=>{
      this.clientes=data["clientes"];
      console.log(this.clientes);
    })
  }

  EliminarC(id){
    this.clienteService.EliminarCliente(id).subscribe(
      response=>{
        console.log('response')
      },
      error=>{
        console.log(error)
      }
    )
  }
}
