import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { map} from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { UsersService} from  './users.service';

import { CargarDetallesFacturas } from '../interfaces/cargar-detalles-facturas';
import { DetalleFactura } from '../models/detalle-factura.model';



const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})

export class DetalleFacturaService {

  
  public detalleFactura: DetalleFactura;


  constructor( private http: HttpClient, 
                private userService: UsersService,
              ) {

    // this.googleInit();
    
  }


  //Devolver el id del producto

  get detalleFacturaId():string {
    return this.detalleFactura._id || '';
  }

  // Crear Factura
  crearDetalleFactura( formData: DetalleFactura ) {
    // console.log('Creando Detalle Factura Service');
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

    // CARGAR USUARIOS CON PAGINACIÓN
cargarDetallesFacturas( desde: number = 0 ) {

  const url = `${ base_url }/detalles-facturas?desde=${ desde }`;
    return this.http.get<CargarDetallesFacturas>( url, this.userService.headers )
            .pipe(
              map( resp => {    
                const detallesFacturas = resp.detallesFacturas.map( 
                  detalleFactura => new DetalleFactura( detalleFactura.id_producto, detalleFactura.id_producto, detalleFactura.cantidad, detalleFactura.precio_unitario, detalleFactura.total, detalleFactura.usuario, detalleFactura._id)  
                );
                return {
                  total: resp.total,
                  detallesFacturas
                };
              })
            )
  }
  

}