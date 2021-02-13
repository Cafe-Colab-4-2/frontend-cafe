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
    
  }



}
