import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';


import { UsersService} from  './users.service';

import { FacturaForm } from '../interfaces/factura.forms';
import { CargarFacturas } from '../interfaces/cargar-detalles-facturas';
import { Factura } from '../models/factura.model';



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
  crearFactura( facturaData: FacturaForm ) {
    console.log('Creando Factura Service');
    return this.http.post(`${ base_url }/facturas`, facturaData, this.userService.headers  );
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

      // CARGAR USUARIOS CON PAGINACIÓN
cargarFacturas( desde: number = 0 ) {

  const url = `${ base_url }/facturas?desde=${ desde }`;
    return this.http.get<CargarFacturas>( url, this.userService.headers )
            .pipe(
              map( resp => {    
                const facturas = resp.facturas.map( 
                  factura => new Factura( factura.fecha, factura.total_factura, factura.id_cliente, factura.usuario )  
                );

                // const fechas = resp.facturas.map(
                //     this.factura.fecha
                //   );
                // );

                return {
                  total: facturas.length,
                  facturas
                };
              })
            )
  }

  getFacturas() {

    const url = `${ base_url }/facturas`;
      return this.http.get<CargarFacturas[]>( url, this.userService.headers )
              .pipe(
                map( (resp: any) => {    
                  const facturas = resp.facturas
  
                  return {
                    total: resp.facturas.length,
                    facturas
                  };
                })
              )
    }

}