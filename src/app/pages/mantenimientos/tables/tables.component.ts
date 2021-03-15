import { CdkDragDrop, CdkDragEnd, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Mesa } from '../../../models/mesa.model';
import { Producto } from '../../../models/productos.model';
import Swal from 'sweetalert2';
import { Pedido, CostosTotalesMesas } from '../../../models/pedidos.model';
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
  public costoMesaTemp: number;
  // public totalCostosPedidosMesas: CostosTotalesMesas[] = [];  
  public totalCostosPedidosMesas: CostosTotalesMesas[] = [ ];  


  public mesas: Mesa[] = [
                  { 'no': 1, 'sillas': 10, 'productos': [], 'total': 0, 'occuped': false },
                  { 'no': 2, 'sillas': 3,  'productos': [], 'total': 0, 'occuped': false },
                  { 'no': 3, 'sillas': 8,  'productos': [], 'total': 0, 'occuped': false },
                  { 'no': 4, 'sillas': 4,  'productos': [], 'total': 0, 'occuped': false },
                  { 'no': 5, 'sillas': 3,  'productos': [], 'total': 0, 'occuped': false },
                  { 'no': 6, 'sillas': 8,  'productos': [], 'total': 0, 'occuped': false },
                  { 'no': 7, 'sillas': 4,  'productos': [], 'total': 0, 'occuped': false },
                  { 'no': 8, 'sillas': 3,  'productos': [], 'total': 0, 'occuped': false },
                  { 'no': 9, 'sillas': 8,  'productos': [], 'total': 0, 'occuped': false },
                  { 'no': 10, 'sillas': 4, 'productos': [], 'total': 0, 'occuped': false },
                  { 'no': 11, 'sillas': 3, 'productos': [], 'total': 0, 'occuped': false },
                  { 'no': 12, 'sillas': 8, 'productos': [], 'total': 0, 'occuped': false },
                        ];

  public pedidosLocal: Pedido[]= [];
  public productos: Producto[] = [];
  public productosTemp: Producto[] = [];
  public pedidos: Producto[] = [];

  public pedido: Producto = {descripcion: '', precio_venta: 0, categoria: '', presentacion: '', stock: 0, activo: true, usuario: '', getImage: ''};


  constructor( private productService: ProductService ) { }

  ngOnInit(): void {
    this.cargarProductos();
    // this.verificaMesas();
    this.mesas = this.ponerMesaYDatos();
  }

  ponerMesasFromLocalStorage(){

  }

  verificaMesas() {
    const existe = localStorage.getItem('mesas');
    // console.log(existe);
    
    if( existe === null) {
      localStorage.setItem('mesas', JSON.stringify(this.mesas));
    } 
  }

  ponerMesaYDatos() {
    return JSON.parse(localStorage.getItem('mesas'));
  }

  cargarProductos() {
    this.productService.cargarProductos(this.desde)
    .subscribe( resp => {
      // console.log(resp);
      this.productos = resp.productos;
      this.productosTemp = resp.productos;
      this.totalProductos = resp.total;
    });
  }


  modalProductos(value: boolean) {
    this.modalOpcion = value;
    this.pedidos = [];
    // console.log('modal');
    
  }

  cargaModal(noMesa: number) {
    console.log('modal: ', noMesa);
    
    this.modalProductos(true);
    this.numeroMesa = noMesa;
    this.pedidos = this.mesas[noMesa -1].productos;
  }



  agregarAPedido(product: Producto) {
    if( this.pedidos.length == 0) {
      product.mesa = this.numeroMesa;
      product.cantidad = 1;
      this.pedidos.push(product);
      this.mesas[product.mesa - 1].productos = this.pedidos;
      this.mesas[product.mesa - 1].total += (product.precio_venta * product.cantidad);
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
        this.mesas[product.mesa - 1].productos = this.pedidos;
        this.mesas[product.mesa  - 1].total += (product.precio_venta * product.cantidad);
      }
    }    
  }


  setCantidadProducto(num: string, producto: Producto) {

    this.pedidos.forEach( pedido => {

        if( num == '+1' && pedido._id == producto._id ) {
          pedido.cantidad++;
          this.mesas[producto.mesa - 1].total += pedido.precio_venta; 
        }
        else if (num == '-1' && pedido._id == producto._id) {
          if( pedido.cantidad <= 1 ){
            pedido.cantidad = 1;
          }
          else {
            pedido.cantidad--;
            this.mesas[producto.mesa - 1].total -= pedido.precio_venta ;
          }
      }
    });

  }

  eliminarProductoDePedido(product: Producto) {
    let index = this.pedidos.indexOf(product);
    this.mesas[product.mesa - 1].total -= (product.precio_venta * product.cantidad);
    this.pedidos.splice( index, 1);
    this.pedidosLocal[product.mesa - 1].productos = this.pedidos;
  }

  guardarTablas() {
    this.mesas[this.numeroMesa - 1].occuped = true;
    localStorage.setItem('mesas',  JSON.stringify(this.mesas));
  }

  generarFactura() {
    this.pedidos = [];
    this.mesas[this.numeroMesa - 1].productos = [];
    this.mesas[this.numeroMesa - 1].occuped = false;
    this.mesas[this.numeroMesa - 1].total = 0;
    localStorage.setItem('mesas',  JSON.stringify(this.mesas));
  }

}
  