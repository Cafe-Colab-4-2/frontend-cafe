import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html'
})
export class RxjsComponent {

  constructor() { 
    this.suscripcionObservable();
  }

  retornaObservable(): Observable<number> {
    
    let i = -1;

    /**
     * Envía un parámetro observer, el cual devolverá información según lo que pase en la función
     */
    return new Observable<number>( observer => {
  
          // Se creo un intervalo que repetirá cada segundo
      const intervalo = setInterval( () => {
        i++;
        observer.next(i);    // Devuelve a la suscripción el valor de 'i' al suscriber en 'valor(next)'
        if( i===4 ) {
          clearInterval( intervalo ); // Limpia el intervalo, es decir: -1, 0, 1, 2, 3, 4, FIN
          observer.complete();        // Indica que el Observable finaliza
        }

        if( i===2 ) {
          console.log('i vale: 2');
          observer.error('i llego al valor = 2 ');  // La opción ERROR, devuelve el error al suscriber y lo detiene
        }

      }, 1000);

    });
  }

  suscripcionObservable() {
     
    /**
     * Ejecución del Observable, para ello se debe suscribir
     * Por defecto son tres funciones: CORRECTO, ERROR y FIN
     * los cuales se ejcutan en funciones de flecha 
     */
    this.retornaObservable().pipe(
      retry()   // Se puede enviar un parámetro donde indique las veces que se quiere que reintente ej: retry(3) 
    ).subscribe(
    valor => console.log('Subs: ', valor),
    error => console.log('Error, ', error),
    () => console.log('OBS TERMINADO')
  );
  }
  
}
