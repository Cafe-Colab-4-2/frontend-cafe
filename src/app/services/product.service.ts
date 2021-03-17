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



const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})

export class ProductService {

  
  public producto: Producto;


  constructor( private http: HttpClient, 
                private userService: UsersService,
                private router: Router,
                private ngZone: NgZone ) {

    // this.googleInit();
    
  }


  //Devolver el id del producto

  get productid():string {
    return this.producto._id || '';
  }

  // Crear prductos
  crearProducto( formData: ProductoForm ) {
    
    console.log('Creando Producto');
    

    return this.http.post(`${ base_url }/productos`, formData, this.userService.headers  )
              .pipe(
                tap( (resp: any) => {
                  localStorage.setItem('token', resp.token )
                })
              )

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


  // CARGAR PRODUCTO CON PAGINACIÓN
cargarProductos( desde: number = 0 ) {

  const url = `${ base_url }/productos?desde=${ desde }`;
    return this.http.get<CargarProductos>( url, this.userService.headers )
            .pipe(
              map( resp => {
                const productos = resp.productos.map( 
                  producto => new Producto(producto.categoria, producto.presentacion, producto.descripcion, producto.activo, producto.usuario, producto.stock, producto.precio_venta, producto.img, producto._id)  
                );
                return {
                  total: resp.total,
                  productos
                };
              })
            )
  }
  // Fin Cargar productos
  

//eliminar producto

  eliminarProducto( producto: Producto ) {
    
      // /usuarios/5eff3c5054f5efec174e9c84
      const url = `${ base_url }/productos/${ producto._id }`;
      return this.http.delete( url, this.userService.headers );
  }


//guardar productos 
  guardarProducto( producto: Producto ) {

    return this.http.put(`${ base_url }/productos/${ producto._id }`, producto, this.userService.headers );

  }
  

}