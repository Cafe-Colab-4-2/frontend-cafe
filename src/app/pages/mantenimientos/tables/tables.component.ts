import { CdkDragDrop, CdkDragEnd, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Mesa } from '../../../models/mesa.model';
import { Producto } from '../../../models/productos.model';
import Swal from 'sweetalert2';
import { Pedido } from '../../../models/pedidos.model';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html'
})
export class TablesComponent implements OnInit {

  public rows = new Array(10); 
  public cols = new Array(5);
  public modalOpcion = false;
  public numeroMesa = 0;
  public cantidadProducto = 1;
  public producto = '';
  public precio_venta = 0;
  public desde: number = 0;
  public totalProductos: number;


  public mesas: Mesa[] = [
                  { 'no': 1, 'sillas': 10, 'dragPosition': {x: 200, y: 10} },
                  { 'no': 2, 'sillas': 3, 'dragPosition': {x: 150, y: 20} },
                  { 'no': 3, 'sillas': 8, 'dragPosition': {x: 300, y: 20} },
                  { 'no': 4, 'sillas': 4, 'dragPosition': {x: 200, y: 10} },
                  { 'no': 5, 'sillas': 3, 'dragPosition': {x: 150, y: 20} },
                  { 'no': 6, 'sillas': 8, 'dragPosition': {x: 300, y: 20} },
                  { 'no': 7, 'sillas': 4, 'dragPosition': {x: 200, y: 10} },
                  { 'no': 8, 'sillas': 3, 'dragPosition': {x: 150, y: 20} },
                  { 'no': 9, 'sillas': 8, 'dragPosition': {x: 300, y: 20} },
                  { 'no': 10, 'sillas': 4, 'dragPosition': {x: 200, y: 10} },
                  { 'no': 11, 'sillas': 3, 'dragPosition': {x: 150, y: 20} },
                  { 'no': 12, 'sillas': 8, 'dragPosition': {x: 300, y: 20} },
                        ];

  // public productos: Producto[] = [
  //   {
  //     "id": 1,
  //     "descripcion": "Cafe",
  //     "precio_venta": 15.50,
  //     "categoria": "CALIENTE",
  //     "presentacion": "Mediano",
  //     "stock": 10,
  //     "img": "../../../assets/images/gallery/chair.jpg"
  // },
  // {
  //   "id": 2,
  //   "descripcion": "Capuchino",
  //   "precio_venta": 15.50,
  //   "categoria": "CALIENTE",
  //   "presentacion": "Mediano",
  //   "stock": 10,
  //   "img": "../../../assets/images/gallery/chair.jpg"
  // },
  // {
  //   "id": 3,
  //   "descripcion": "Latte",
  //   "precio_venta": 17,
  //   "categoria": "CALIENTE",
  //   "presentacion": "Mediano",
  //   "stock": 20,
  //   "img": "../../../assets/images/gallery/chair.jpg"
  // },
  // {
  //   "id": 4,
  //   "descripcion": "Cafe",
  //   "precio_venta": 17.50,
  //   "categoria": "CALIENTE",
  //   "presentacion": "Grande",
  //   "stock": 10,
  //   "img": "../../../assets/images/gallery/chair.jpg"
  // },
  // {
  //   "id": 5,
  //   "descripcion": "Capuchino",
  //   "precio_venta": 18.50,
  //   "categoria": "CALIENTE",
  //   "presentacion": "Grande",
  //   "stock": 10,
  //   "img": "../../../assets/images/gallery/chair.jpg"
  // },
  // {
  //   "id": 6,
  //   "descripcion": "Latte",
  //   "precio_venta": 17,
  //   "categoria": "CALIENTE",
  //   "presentacion": "Mediano",
  //   "stock": 20,
  //   "img": "../../../assets/images/gallery/chair.jpg"
  // },
  // {
  //   "id": 7,
  //   "descripcion": "Coca Cola",
  //   "precio_venta": 17,
  //   "categoria": "FRIO",
  //   "presentacion": "550ml",
  //   "stock": 20,
  //   "img": "../../../assets/images/gallery/chair.jpg"
  // },
  // {
  //   "id": 8,
  //   "descripcion": "Coca Cola",
  //   "precio_venta": 17,
  //   "categoria": "FRIO",
  //   "presentacion": "330ml",
  //   "stock": 20,
  //   "img": "../../../assets/images/gallery/chair.jpg"
  // },
  // {
  //   "id": 9,
  //   "descripcion": "Coca Cola",
  //   "precio_venta": 17,
  //   "categoria": "FRIO",
  //   "presentacion": "550ml",
  //   "stock": 20,
  //   "img": "../../../assets/images/gallery/chair.jpg"
  // },
  // {
  //   "id": 10,
  //   "descripcion": "Coca Cola",
  //   "precio_venta": 17,
  //   "categoria": "FRIO",
  //   "presentacion": "1000ml",
  //   "stock": 20,
  //   "img": "../../../assets/images/gallery/chair.jpg"
  // },
  // {
  //   "id": 11,
  //   "descripcion": "Coca Cola",
  //   "precio_venta": 17,
  //   "categoria": "FRIO",
  //   "presentacion": "350ml",
  //   "stock": 20,
  //   "img": "../../../assets/images/gallery/chair.jpg"
  // },
  // {
  //   "id": 12,
  //   "descripcion": "Coca Cola",
  //   "precio_venta": 17,
  //   "categoria": "FRIO",
  //   "presentacion": "650ml",
  //   "stock": 20,
  //   "img": "../../../assets/images/gallery/chair.jpg"
  // }
  //                       ];

  public productos: Producto[] = [];
  public productosTemp: Producto[] = [];
  public pedidos: Producto[] = []

  public pedido: Producto = {descripcion: '', precio_venta: 0, categoria: '', presentacion: '', stock: 0, activo: true, usuario: '', getImage: ''};


  constructor( private productService: ProductService ) { }

  ngOnInit(): void {
    this.cargarProductos();
    this.verificaMesas();
    this.mesas = this.ponerMesas();
  }

  verificaMesas() {
    const existe = localStorage.getItem('mesas');
    // console.log(existe);
    
    if( existe === null) {
      localStorage.setItem('mesas', JSON.stringify(this.mesas));
    }
  }


  getPosition(event: CdkDragEnd, noMesa: number){
    // console.log(event.source.getFreeDragPosition()); // returns { x: 0, y: 0 }

    this.mesas[noMesa].dragPosition.x = event.source.getFreeDragPosition().x;
    this.mesas[noMesa].dragPosition.y = event.source.getFreeDragPosition().y;
    
    localStorage.setItem('mesas', JSON.stringify(this.mesas));
    this.ponerMesas();
  }

  ponerMesas() {
    // console.log(this.mesas);
    return JSON.parse(localStorage.getItem('mesas'));
  }

  cargarProductos() {
    this.productService.cargarProductos(this.desde)
    .subscribe( resp => {
      console.log(resp);
      this.productos = resp.productos;
      this.productosTemp = resp.productos;
      this.totalProductos = resp.total;
    });
  }


  modalProductos(value: boolean) {
    this.modalOpcion = value;
    this.pedidos = [];
    console.log('modal');
    
  }

  setNumeroMesa(mesa: number) {
    this.modalProductos(true);
    this.numeroMesa = mesa;
  }



  agregarAPedido(product: Producto) {
    console.log('Tamanio Pedidos: ', this.pedidos.length);

    if( this.pedidos.length == 0) {
      product.mesa = this.numeroMesa;
      product.cantidad = 1;
      this.pedidos.push(product);
      console.log('Pedidos: ', this.pedidos.length);
    }
    else {
      const exi = this.pedidos.includes(product);

      if( exi ) {
        console.log(this.pedidos, 'Existe: ', exi, 'NO ACTIONS');
      }
      else {
        product.mesa = this.numeroMesa;
        product.cantidad = 1;
        this.pedidos.push(product);
        console.log('Pedidos: ', this.pedidos.length);
        console.log('Existe: ', exi, 'NUEVO REGISTRO');
      }
    
    }

    
  }



  setCantidadProducto(num: string, producto: Producto) {

    this.pedidos.forEach( pedido => {

        if( (num == '+1' && pedido.descripcion == producto.descripcion) && pedido.presentacion == producto.presentacion ) {
          producto.cantidad++;
        }
        else if ((num == '-1' && pedido.descripcion == producto.descripcion) && pedido.presentacion == producto.presentacion ) {
          if( this.cantidadProducto <= 1 ){
            pedido.cantidad = 1;
          }
          else {
            this.cantidadProducto--;
          }
      }
    });

  }

  eliminarProductoDePedido(producto: Producto) {
    let index = this.pedidos.indexOf(producto);
    this.pedidos.splice( index, 1);
  }

  guardarTablas() {
    localStorage.setItem('pedidos',  JSON.stringify(this.pedidos));
  }

}
  