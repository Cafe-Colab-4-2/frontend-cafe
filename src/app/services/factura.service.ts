import { Injectable } from '@angular/core';
import { DetalleFactura } from './../models/detallefactura.model';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Factura } from '../models/factura.model';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class FacturaService {

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

   mostrarFacturas(): Observable<Factura[]> {
    return this.http.get<Factura[]>(`${ base_url }/facturas`,
     this.headers)
    .pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token )
      })
    )
  }

  BuscarUsuario(id):Observable<Usuario>{
    return this.http.get<Usuario>(`${ base_url }/usuarios/`+id,
     this.headers)
    .pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token )
      })
    )
  }
}
