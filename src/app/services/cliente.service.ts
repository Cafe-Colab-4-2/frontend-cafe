import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cliente } from '../models/cliente.models';
import { tap, map, catchError } from 'rxjs/operators';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http:HttpClient) { }

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

  crearCliente(cliente): Observable<any> {
    return this.http.post<any>(`${base_url}/clientes`, cliente, this.headers)
    .pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token )
      })
    )
  }

  

  mostrarClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${ base_url }/clientes`,
     this.headers)
    .pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token )
      })
    )
  }
}
