import { Router } from '@angular/router';
import { FacturaService } from './../../../services/factura.service';
import { Factura } from './../../../models/factura.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {
  facturas:Factura[]=[];
  usuario:Usuario;
  usuarioEncontrado:Usuario;

  constructor(public facturaService:FacturaService,
    public router:Router) { }

  ngOnInit(): void {
    this.MostrarFacturas();
  }

  MostrarFacturas(){
    this.facturaService.mostrarFacturas().subscribe(data=>{
      this.facturas=data['facturas'];
      // console.log(this.facturas);

    })
  }
}
