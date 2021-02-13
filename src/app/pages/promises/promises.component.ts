import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styleUrls: ['./promises.component.css']
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    const promesa = new Promise( ( resolve, reject ) => {
    
      if (false) {
        resolve('Hola Mundo');
      }
      else 
      {
        reject('Algo Salio Mal')
      }
    });

    promesa.then( (mensaje) => {
      console.log(mensaje);
    }).catch((error) => {
      console.log('ERROR: ', error);
    });

    console.log('FIN DEL INIT');

    // PRÁCTICA 
    this.getUsuarios().then( usuarios => {
      console.log(usuarios);
    }) 
    
  }

  // getUsuarios() {
  //   fetch('https://reqres.in/api/user')
  //     .then( resp => {
  //       console.log('Tengo Data', resp.json().then( (body) => {
  //           console.log(body);
  //       }));
  //     })
  // }


  getUsuarios() {

    return new Promise(resolve => { 
      fetch('https://reqres.in/api/user')
      .then( resp => resp.json() )
      .then( body => resolve(body.data))
    });
  }



}
