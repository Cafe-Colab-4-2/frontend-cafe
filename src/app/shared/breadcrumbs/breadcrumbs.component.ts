import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  titulo: string;
  argumentosRuta: Subscription;

  constructor( private router: Router ) { 
    this.argumentosRuta = this.getArgumentosRuta()
    .subscribe( event => {
      // console.log(event, event.titulo);
      this.titulo = event.titulo;
      document.title =  `Café - ${event.titulo}`
      
    });
  }
  ngOnDestroy(): void {
    this.argumentosRuta.unsubscribe();
  }

  getArgumentosRuta() {
    return this.router.events
    .pipe(
      filter( event => event instanceof ActivationEnd),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
      map(  (event: ActivationEnd) => event.snapshot.data ),
    )

    /* También se puede desusctructurar el event ej 
    .suscribe( { titulo }) => {
      etc......
    }
    */
  }

}
