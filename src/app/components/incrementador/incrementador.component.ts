import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent {

  // RENOMBRAR Variable 
  // @Input('valor') porcentaje = 5;
  @Input() porcentaje = 5;
  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  constructor() { }
  
  cambiarValor (valor: number) {


    if( this.porcentaje < 0) {
      this.valorSalida.emit(0);
      this.porcentaje = 0;
    }

    if( this.porcentaje > 100) {
      this.valorSalida.emit(100);
      this.porcentaje = 100;
    }

    this.porcentaje += valor;
    this.valorSalida.emit(this.porcentaje);

  }



}
