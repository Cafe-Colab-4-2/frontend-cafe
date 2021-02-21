import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html'
})
export class RxjsComponent implements OnDestroy{


  intervaloSuscription: Subscription;

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
      
   this.intervaloSuscription = this.retornaIntervalo()
     .subscribe(console.log);
     
  }

  ngOnDestroy() {
    this.intervaloSuscription.unsubscribe();
  }

  iniciaIntervalo() {
    this.intervaloSuscription = this.retornaIntervalo()
    .subscribe(console.log);  
  }


  retornaIntervalo(): Observable<number> {
    return interval(1000)
    .pipe(                     
      take(10),           // Limita las veces que se ejecuta el intervalo en este caso sería de 0 a 3, el orden es importante
      map( valor => valor ), // Sustituye el valor por defecto por el que se le indique, puede ser un valor o lo que sea
      filter( valor => (valor % 2 === 0)? true : false) // deja pasar únicamente los valores que cumplen 
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
