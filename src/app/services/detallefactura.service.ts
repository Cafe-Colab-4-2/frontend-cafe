import { Injectable } from '@angular/core';
import { Producto } from './../models/producto.model';
import { catchError, retry, tap } from 'rxjs/operators';
import { DetalleFactura } from './../models/detallefactura.model';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DetallefacturaService {

  constructor(private http:HttpClient) { }

  // Obtener el token del usuario
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

  // Mostrar los detalles de factura
  ObtenerDetalle(): Observable<DetalleFactura[]> {
    return this.http.get<DetalleFactura[]>(`${ base_url }/detalles-facturas`,
    this.headers)
    .pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token )
      })
    )
  }


  ObtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${ base_url }/productos`, this.headers)
    .pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token )
      })
    )
  }

  BuscarProducto(id){
    return this.http.get<Producto>(`${ base_url }/productos/`+id,
    this.headers)
    .pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token )
      })
    )
  }
}
