import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {

  progreso = 50;

  constructor() { }

  get getProgreso() {
    return `${this.progreso}%`
  }

  cambioValorDesdeHijo(valor: number) {
    console.log('testing', valor);
    this.progreso = valor;
  }

}
