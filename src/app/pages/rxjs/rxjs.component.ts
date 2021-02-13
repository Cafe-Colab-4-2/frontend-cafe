import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { retry, take, map } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html'
})
export class RxjsComponent {

  constructor() { 
    // this.suscripcionObservable();

    /*
    OPCIÓN # 1
    this.retornaIntervalo()
      .subscribe(
        (valor) => console.log(valor)
      );
    
    OPCIÓN # 2
    this.retornaIntervalo()
      .subscribe(console.log);
       
    */
      
   this.retornaIntervalo()
     .subscribe(console.log);
     
  }


  retornaIntervalo(): Observable<number> {
    return interval(1000)
    .pipe(                     
      take(4),           // Limita las veces que se ejecuta el intervalo en este caso sería de 0 a 3
      map( valor => valor + 1) // Sustituye el valor por defecto por el que se le indique, puede ser un valor o lo que sea
     );
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
