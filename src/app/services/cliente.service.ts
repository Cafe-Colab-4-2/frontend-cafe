import { Injectable } from '@angular/core';
import { catchError, retry, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cliente } from '../models/cliente.models';

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

  crearCliente(cliente){
    return this.http.post(`${ base_url }/clientes`,cliente,
      this.headers)
    .pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token )
      })
    )
  }

  BuscarCliente(id):Observable<Cliente>{
    return this.http.get<Cliente>(`${ base_url }/clientes/`+id,
      this.headers)
    .pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token )
      })
    )
  }
  MostrarClientes():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${ base_url }/clientes`,
      this.headers)
    .pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token )
      })
    )
  }

  EliminarCliente(id){
    return this.http.delete<Cliente>(`${ base_url}/clientes/`+id,
    this.headers)
    .pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token )
      })
    )
  }
}
