import { Component } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent {

  titulo: string;

  constructor( private router: Router ) { 
    this.getArgumentosRuta();
  }

  getArgumentosRuta() {
    this.router.events
    .pipe(
      filter( event => event instanceof ActivationEnd),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
      map(  (event: ActivationEnd) => event.snapshot.data ),
    )
    .subscribe( event => {
      console.log(event, event.titulo);
      this.titulo = event.titulo;
      document.title =  `Café - ${event.titulo}`
      
    })

    /* También se puede desusctructurar el event ej 
    .suscribe( { titulo }) => {
      etc......
    }
    */
  }

}
