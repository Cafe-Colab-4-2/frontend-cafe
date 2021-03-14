import { Injectable } from '@angular/core';
import { Producto } from './../models/producto.model';
import { catchError, retry } from 'rxjs/operators';
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

  // obtener el token y enviarlo al header
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  // Mostrar los detalles de factura
  ObtenerDetalle(): Observable<DetalleFactura[]> {
    let direccion=base_url+'/detalles-facturas';
    return this.http.get<DetalleFactura[]>(direccion, this.headers)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  BuscarProducto(id){
    let direccion=base_url+'/productos/';
    return this.http.get<Producto>(direccion+id,
      this.headers)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Eliminar detalle factura
  EliminarDetalleFactura(id){
    let direccion=base_url+'/detalles-facturas/';
    return this.http.delete<DetalleFactura>(direccion + id,
      this.headers)
    .pipe(
      catchError(this.handleError)
    )
  }

  //  capturar errores al consultar la api
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
}