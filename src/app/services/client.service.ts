import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { from, Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { LoginForm } from '../interfaces/login-form';
import { RegisterForm } from '../interfaces/register-form';
import { CargarUsuarios } from '../interfaces/cargar-usuarios';
import { UsersService} from  './users.service';
import { CargarProductos } from '../interfaces/cargar-productos';
import { ProductoForm } from '../interfaces/producto-form';
import { Producto } from '../models/productos.model';
import { Cliente } from '../models/cliente.model';
import { ClienteForm } from '../interfaces/cliente.forms';
import { Factura } from '../interfaces/factura.forms';



const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  
  public cliente: Cliente;


  constructor( private http: HttpClient, 
                private userService: UsersService,
                private router: Router,
                private ngZone: NgZone ) {

    // this.googleInit();
    
  }


  //Devolver el id del producto

  get clientId():string {
    return this.cliente._id || '';
  }

  // Crear prductos
  crearCliente( formData: Factura ) {
    
    return this.http.post(`${ base_url }/clientes`, formData, this.userService.headers  );

  }
  // Fin Crear productos
  

  // Actualizar Producto
  actualizarProducto( data: { categoria: string,
    presentacion: string,
    usuario: string,
    stock: number,
    precio_venta: number,
    img?: string,}, productId: string ) {

    
    return this.http.put(`${ base_url }/productos/${productId}`, data, this.userService.headers );
  }

  getCliente(nit: number) {
    const url = `${ base_url }/clientes/${ nit }`;
    return this.http.get<Cliente>(url, this.userService.headers);
  }

  


}