import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Mesa } from '../../../models/mesa.model';
import { Producto } from '../../../models/productos.model';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styles: [
  ]
})
export class TablesComponent implements OnInit {


  public mesas: Mesa[] = [
                  { 'no': 1, 'sillas': 4, 'dragPosition': {x: 50, y: 10} },
                  { 'no': 2, 'sillas': 3, 'dragPosition': {x: 150, y: 20} },
                  { 'no': 3, 'sillas': 8, 'dragPosition': {x: 300, y: 20} },
                ];

  public productos: Producto[] = [
    {
      "descripcion": "Cafe",
      "precio_venta": 15.50,
      "categoria": "CAFE",
      "presentacion": "M",
      "stock": 10
  },
  {
    "descripcion": "Capuchino",
    "precio_venta": 15.50,
    "categoria": "CAFE",
    "presentacion": "M",
    "stock": 10
  },
  {
    "descripcion": "Latte",
    "precio_venta": 17,
    "categoria": "CAFE",
    "presentacion": "M",
    "stock": 20
  }
];


  constructor( ) { }

  ngOnInit(): void {
    this.verificaMesas();
    this.mesas = this.ponerMesas();
  }

  verificaMesas() {
    const existe = localStorage.getItem('mesas');
    console.log(existe);
    
    if( existe === null) {
      localStorage.setItem('mesas', JSON.stringify(this.mesas));
    }
  }


  getPosition(event: CdkDragEnd, noMesa: number){
    console.log(event.source.getFreeDragPosition()); // returns { x: 0, y: 0 }

    this.mesas[noMesa].dragPosition.x = event.source.getFreeDragPosition().x;
    this.mesas[noMesa].dragPosition.y = event.source.getFreeDragPosition().y;
    
    localStorage.setItem('mesas', JSON.stringify(this.mesas));
    this.ponerMesas();
  }

  ponerMesas() {
    console.log(this.mesas);
    return JSON.parse(localStorage.getItem('mesas'));
  }

  desplegarProductos() {
    
      this.productos.forEach(element => {
        alert( element.descripcion)
      })
    
    console.log(this.productos);
    
  }

}
