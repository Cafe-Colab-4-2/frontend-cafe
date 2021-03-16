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
import { Factura, FacturaForm } from '../interfaces/factura.forms';



const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})

export class FacturaService {

  
  public factura: Factura;


  constructor( private http: HttpClient, 
                private userService: UsersService,
                private router: Router,
                private ngZone: NgZone ) {

    // this.googleInit();
    
  }


  //Devolver el id del producto

  get facturaId():string {
    return this.factura._id || '';
  }

  // Crear Factura
  crearFactura( formData: FacturaForm ) {
    console.log('Creando Factura Service');
    return this.http.post<FacturaForm>(`${ base_url }/facturas`, formData, this.userService.headers  );
  }
  // Fin Crear Factura
  

  // Actualizar Producto
  actualizarProducto( data: { categoria: string,
    presentacion: string,
    usuario: string,
    stock: number,
    precio_venta: number,
    img?: string,}, productId: string ) {

    
    return this.http.put(`${ base_url }/productos/${productId}`, data, this.userService.headers );
  }
  

}