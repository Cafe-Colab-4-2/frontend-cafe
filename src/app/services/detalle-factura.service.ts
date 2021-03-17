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
import { Factura, DetalleFactura } from '../interfaces/factura.forms';



const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})

export class DetalleFacturaService {

  
  public detalleFactura: DetalleFactura;


  constructor( private http: HttpClient, 
                private userService: UsersService,
                private router: Router,
                private ngZone: NgZone ) {

    // this.googleInit();
    
  }


  //Devolver el id del producto

  get detalleFacturaId():string {
    return this.detalleFactura._id || '';
  }

  // Crear Factura
  crearDetalleFactura( formData: DetalleFactura ) {
    console.log('Creando Detalle Factura Service');
    return this.http.post<DetalleFactura>(`${ base_url }/detalles-facturas`, formData, this.userService.headers  );
  }
  // Fin Crear Factura
  

  // Actualizar Producto
  actualizarProducto( data: { categoria: string,
    presentacion: string,
    usuario: string,
    stock: number,
    precio_venta: number,
    img?: string,}, productId: string ) {

    
    return this.http.put(`${ base_url }/detalles-facturas/${productId}`, data, this.userService.headers );
  }
  

}