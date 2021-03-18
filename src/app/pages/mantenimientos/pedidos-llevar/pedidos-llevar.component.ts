import { Component, OnInit } from '@angular/core';
import { PedidosLlevarSerivce } from '../../../services/pedidos-llevar.service';
import { PedidoLlevar, Pedido } from '../../../models/pedidos.model';
import { Producto } from '../../../models/productos.model';
import { ProductService } from '../../../services/product.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pedidos-llevar',
  templateUrl: './pedidos-llevar.component.html'
})
export class PedidosLlevarComponent implements OnInit {

  public pedidosLlevar: PedidoLlevar[] = [
    { 'pedidoNo': 1, 'productos': [], 'nombreCliente': 'Andres', 'total': 0 },
    { 'pedidoNo': 2, 'productos': [], 'nombreCliente': 'Juan', 'total': 0 }, 
  ];
  public pedidosLlevarClean: PedidoLlevar = {'pedidoNo': 1, 'productos': [], 'nombreCliente': 'Andres', 'total': 0};
  // public pedidos: PedidoLlevar[] = [];
  public productos: Producto[] = [];
  // public productosPedidosTemp: Producto[] = [];

  public pedidos: PedidoLlevar[] = [];
  public pedidoTemp: PedidoLlevar;
  public pedidoClean: PedidoLlevar = {'nombreCliente': '', 'pedidoNo': 0, 'productos': [], 'total': 0}
  public facturaForm: FormGroup;
  public productosPedidosTemp: Producto[] = [];
  public nombreCliente = '';

  public noPedido = 0;
  public noPedidoActual = 0;

  public mostrarPedidos: boolean;
  public nuevoPedido: boolean;
  public factura = false;
  public habilitaBoton = false;

  constructor( private pedidosService: PedidosLlevarSerivce, private productService: ProductService ) { }

  ngOnInit(): void {
    this.cargarProductos();
    // this.pedidos.push(this.pedidoClean);
    // console.log('Pedidos: ', this.pedidos);
    
    
    // if(this.pedidosTemp.length == 0) {
    //   this.mostrarPedidos = false;
    //   this.pedidosTemp = this.cargarPedidos();
    // } else {
    //   this.mostrarPedidos = true;
    // }
    
  }

  cargarProductos() {
    this.productService.cargarProductos()
    .subscribe( (resp: any) => {
        this.productos = resp.productos;
    });
  }

  cargarPedidos() {
    return JSON.parse(localStorage.getItem('pedidos'));
  }

  guardarPedidos() {
    localStorage.setItem('pedidos',  JSON.stringify(this.pedidos));
  }

  agregarPedido() {
    this.nuevoPedido = true;
  }

  cancelarPedido() {
    this.nuevoPedido = false;
    this.mostrarPedidos = true;
    this.nombreCliente = '';
  }

  agregarAPedidosTemp(product: Producto) {

    
    if( this.pedidos.length == 0) {


      this.construyePedidos(product);

      console.log('PRODUCTO: ', this.pedidos);
      this.noPedido = this.productosPedidosTemp.length + 1;
    }
    else {
      const exi = this.productosPedidosTemp.includes(product);

      if( exi ) {
        console.log(this.pedidos, 'Existe: ', exi, 'NO ACTIONS');
      }
      else {
        this.construyePedidos(product);
        console.log('NUEVO PRODUCTO');
        // this.noPedido = this.productosPedidosTemp.length + 1;
      }
    } 
    // this.mesas[product.mesa - 1].occuped = true;
    // this.habilitaBotones(this.mesas[this.numeroMesa - 1].productos);
    // this.guardarMesas();
    
  }

  construyePedidos(producto: Producto) {
    producto.noPedido = this.noPedido;
    producto.cantidad = 1;
    this.productosPedidosTemp.push(producto);

    this.pedidos.push(this.pedidoClean);
    this.pedidos[this.noPedido].pedidoNo = this.noPedido;
    this.pedidos[this.noPedido].nombreCliente = this.nombreCliente;
    this.pedidos[this.noPedido].total += (producto.precio_venta * producto.cantidad);
    this.pedidos[this.noPedido].productos = this.productosPedidosTemp;
  }

  generarFactura() {

  }

  getUser(dato: string) {

  }

  campoNoValido(dato: string){

  }

  eliminarProductoDePedido() {

  }

  setCantidadProducto( ) {

  }

  actualizarDatosMesas( ) {

  }

  limpiarPedido() {

  }

  guardarNombreDelivery(nombreParaPedido: string) {
    console.log(nombreParaPedido);
    this.nombreCliente = nombreParaPedido;
  }
}
