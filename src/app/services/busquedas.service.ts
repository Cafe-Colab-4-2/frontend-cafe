import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Producto } from '../models/producto.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http: HttpClient ) { }

  
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  private transformarUsuarios( resultados: any[]): Usuario[] {
    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.activo , user.img, user.google, user.role, user._id ) 
    );

  }
  private transformarProductos( resultados: any[]): Producto[] {
    return resultados.map(
      producto => new Producto(producto.categoria, producto.presentacion, producto.descripcion, producto.activo, producto.usuario, producto.stock, producto.precio_venta, producto.img, producto._id) 
    );

  }



  buscar( 
      tipo: 'usuarios' | 'proveedores' | 'clientes' | 'productos',
      termino: string )
      {
        const url = `${ base_url }/todo/coleccion/${ tipo }/${ termino }`;
        return this.http.get<any[]>( url, this.headers )
          .pipe(
            map( (resp: any) => {
              
              switch ( tipo) {
                case 'usuarios':
                  return this.transformarUsuarios( resp.resultados )
                  break;

                case 'productos':
                  return this.transformarProductos( resp.resultados )
                  break;
              
                default:
                  break;
              }

            } )
          );
  }


}
