import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { Usuario } from '../models/usuario.model';
import { LoginForm } from '../interfaces/login-form';
import { RegisterForm } from '../interfaces/register-form';
import { CargarUsuarios } from '../interfaces/cargar-usuarios';

const base_url = environment.base_url;

// declare const gapi: any;

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  public auth2: any;
  public usuario: Usuario;


  constructor( private http: HttpClient, 
                private router: Router,
                private ngZone: NgZone ) {

    // this.googleInit();
    
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid():string {
    return this.usuario._id || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  /*
  googleInit() {

    return new Promise( resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '1045072534136-oqkjcjvo449uls0bttgvl3aejelh22f5.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    })

  }
  */

  logOut() {
    localStorage.removeItem('token');

    // this.auth2.signOut().then(() => {

    //   this.ngZone.run(() => {
    //     this.router.navigateByUrl('/login');
    //   })
    // });

      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
  }


  validarToken(): Observable<boolean> {

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token );
      }),
      map( (resp: any) => {
        // nombre email role google activo img
        const { email, google, nombre, role, activo, img = '', uid, _id } = resp.usuario;
        this.usuario = new Usuario( nombre, email, '',  activo, img, google, role, _id );
        console.log( resp.usuario);

        return true;
      }),
      catchError( error => of(false) )
    );

  }

  // Crear Usuarios
  crearUsuario( formData: RegisterForm ) {
    
    console.log('Creando Usuario');
    

    return this.http.post(`${ base_url }/usuarios`, formData, this.headers  )
              .pipe(
                tap( (resp: any) => {
                  localStorage.setItem('token', resp.token )
                })
              )

  }
  // Fin Crear Usuarios
  

  // Actualizar Perfil
  actualizarPerfil( data: { email: string, nombre: string, role: string } ) {

    data = {
      ...data,
      role: this.usuario.role
    }
    return this.http.put(`${ base_url }/usuarios/${ this.uid }`, data, this.headers );
  }
  

  // LogIn
  logIn( formData: LoginForm ) {
    
    return this.http.post(`${ base_url }/login`, formData )
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token )
                  })
                );

  }
  // Fin LogIn

  /*
  loginGoogle( token ) {
    
    return this.http.post(`${ base_url }/login/google`, { token } )
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token )
                  })
                );

  }
  */

  // CARGAR USUARIOS CON PAGINACIÓN
cargarUsuarios( desde: number = 0 ) {

  const url = `${ base_url }/usuarios?desde=${ desde }`;
    return this.http.get<CargarUsuarios>( url, this.headers )
            .pipe(
              map( resp => {
                const usuarios = resp.usuarios.map( 
                  user => new Usuario(user.nombre, user.email, '', user.activo , user.img, user.google, user.role, user._id )  
                );
                return {
                  total: resp.total,
                  usuarios
                };
              })
            )
  }
  // Fin Cargar Usuarios
  



  eliminarUsuario( usuario: Usuario ) {
    
      // /usuarios/5eff3c5054f5efec174e9c84
      const url = `${ base_url }/usuarios/${ usuario._id }`;
      return this.http.delete( url, this.headers );
  }


/*
  guardarUsuario( usuario: Usuario ) {

    return this.http.put(`${ base_url }/usuarios/${ usuario.uid }`, usuario, this.headers );

  }
  */

  postUser( formData: LoginForm) {
      console.log('creando usuario');
  }

}


