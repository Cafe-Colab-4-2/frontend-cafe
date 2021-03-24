import { Component, OnInit } from '@angular/core';
import { PedidosLlevarSerivce } from '../../../services/pedidos-llevar.service';
import { PedidoLlevar, Pedido } from '../../../models/pedidos.model';
import { Producto } from '../../../models/productos.model';
import { ProductService } from '../../../services/product.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ClienteService } from 'src/app/services/client.service';
import { Cliente } from '../../../models/cliente.model';

@Component({
  selector: 'app-pedidos-llevar',
  templateUrl: './pedidos-llevar.component.html'
})
export class PedidosLlevarComponent implements OnInit {

  public productos: Producto[] = [];

  public pedidosLlevar: PedidoLlevar[] = [ ];
  // { 'pedidoNo': 1, 'productos': [], 'nombreCliente': 'Andres', 'total': 0 },
  // { 'pedidoNo': 2, 'productos': [], 'nombreCliente': 'Juan', 'total': 0 }, 

  public pedidosLlevarClean: PedidoLlevar = {'pedidoNo': 1, 'productos': [], 'nombreCliente': 'Andres', 'total': 0};

  public pedidos: PedidoLlevar[] = [];
  public pedidosTesting: PedidoLlevar[] = [];
  public pedidoTemp: PedidoLlevar = {'nombreCliente': '', 'pedidoNo': 0, 'productos': [], 'total': 0};
  public pedidoClean: PedidoLlevar = {'nombreCliente': '', 'pedidoNo': 0, 'productos': [], 'total': 0};
  public pedidoTest: PedidoLlevar = {'nombreCliente': '', 'pedidoNo': 0, 'productos': [], 'total': 0}
  public facturaForm: FormGroup;
  public productosPedidosTemp: Producto[] = [];
  public nombreCliente = '';

  public noPedido = 0;
  public indexPedidoActual = 0;
  public totalPedidoActual = 0;

  public mostrarPedidos = true;
  public nuevoPedido = true;
  public pedidosVacio = true;
  public factura = false;
  public habilitaBoton = false;
  public mostrarPedido = false;
  public clienteExiste = false;

  public clientTemp: Cliente;

  constructor( 
    private productService: ProductService, 
    private clientService: ClienteService, 
    private fb: FormBuilder, ) { }

  ngOnInit(): void {
    this.cargarProductos(); // Carga los productos desde la BD
    this.pedidosTesting = [];
    console.log(this.pedidos, 'type: ', typeof(this.pedidos));
    
    this.cargaPedidos();
    this.formulario();

  }

  cargaPedidos() {
    if(this.cargarPedidos()) {
      this.pedidos = this.cargarPedidos();
      this.noPedido = this.pedidos.length;
    } else {
      console.log('No hay pedidos');
    }
  }

  formulario() {
    this.facturaForm = this.fb.group({
      nit: ['', Validators.required],
      nombre: [ '', Validators.required, ],
    }  );
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
    this.mostrarPedidos = false;
  }

  cancelarPedido() {
    this.mostrarPedido = false;
    this.nuevoPedido = false;
    this.mostrarPedidos = true;
    this.nombreCliente = '';
    
    if(this.pedidos.length == 1) {
      this.pedidos = new Array<PedidoLlevar>();
      this.noPedido = 0;
      this.guardarPedidos();
    } else {
      this.noPedido--;
      this.pedidos.forEach(pedido => {
        if(pedido.pedidoNo > this.indexPedidoActual ) {
          pedido.pedidoNo -= 1;
        }
      });
      this.limpiarPedido();
      this.habilitaBotones(this.pedidos[this.indexPedidoActual].productos);
    }


  }

  // Crea nuevos Pedidos
  crearNuevoPedido(nombreClienteParaPedido: string) {
    this.nuevoPedido = true;
    this.mostrarPedidos = true;
    this.mostrarPedido = true;

    this.nombreCliente = nombreClienteParaPedido;
    this.pedidoTemp = {'nombreCliente': '', 'pedidoNo': 0, 'productos': [], 'total': 0};
    
    this.pedidoTemp.nombreCliente = nombreClienteParaPedido; // Se asigna el nombre al pedido
    this.pedidoTemp.pedidoNo = this.pedidos.length;
        
    this.pedidos[this.noPedido] = this.pedidoTemp;
    
    this.noPedido++;
    // console.log(this.pedidoTemp, this.pedidos);
    
    this.pedidoTemp = {'nombreCliente': '', 'pedidoNo': 0, 'productos': [], 'total': 0};

    this.guardarPedidos();

    // this.productosPedidosTemp = [];
    // this.habilitaBotones(this.pedidos[this.indexPedidoActual].productos);

  }
  
  // Abre y carga los productos del pedido seleccionado 
  abrirPedido(pedido: PedidoLlevar) {
    this.mostrarPedidos = false;
    this.mostrarPedido = true;
    this.totalPedidoActual = 0;
    this.nombreCliente = pedido.nombreCliente;
    this.indexPedidoActual = this.pedidos.indexOf(pedido);

    this.pedidoTemp = this.pedidos[this.indexPedidoActual];
    this.productosPedidosTemp = this.pedidos[this.indexPedidoActual].productos;

    this.habilitaBotones(this.pedidos[this.indexPedidoActual].productos);
  }


  // Si el usuario selecciona un producto se agrega al pedido actual
  agregarProductoAPedido(producto: Producto) {
    producto.cantidad = 1;

    const existeProducto = this.productosPedidosTemp.includes(producto);
    
    if( existeProducto ) {
      console.log('EL PRODUCTO YA EXISTE');
    } else {
      this.productosPedidosTemp.push(producto);
      this.pedidos[this.indexPedidoActual].productos = this.productosPedidosTemp;
      this.pedidos[this.indexPedidoActual].total += (producto.cantidad * producto.precio_venta);
    }
    
    this.guardarPedidos();

    this.habilitaBotones(this.pedidos[this.indexPedidoActual].productos);
  }


  // Elimina el producto del pedido
  eliminarProductoDePedido(product: Producto) {
    let index = this.pedidos[this.indexPedidoActual].productos.indexOf(product);
    this.pedidos[this.indexPedidoActual].total -= (product.precio_venta * product.cantidad);
    this.pedidos[this.indexPedidoActual].productos.splice( index, 1);
    
    
    if(this.pedidos[this.indexPedidoActual].productos.length == 0) {
      this.mostrarPedidos = true;
      this.factura = false;
      this.pedidos[this.indexPedidoActual].total = 0;
    }
    
    this.habilitaBotones(this.pedidos[this.indexPedidoActual].productos);
    this.guardarPedidos();
  }

  // Actualiza la cantidad del producto solicitado, su subtotal y el nuevo total
  actualizaCantidadProducto(num: string, producto: Producto) {

    this.pedidos[this.indexPedidoActual].productos.forEach( pedido => {
        if( num == '+1' && pedido._id == producto._id ) {
          pedido.cantidad++;
          this.pedidos[this.indexPedidoActual].total += pedido.precio_venta; 
        }
        else if (num == '-1' && pedido._id == producto._id) {
          if( pedido.cantidad <= 1 ){
            pedido.cantidad = 1;
          }
          else {
            pedido.cantidad--;
            this.pedidos[this.indexPedidoActual].total -= pedido.precio_venta ;
          }
      }
    });
    this.guardarPedidos();
  }

  actualizarDatosMesas() {
    this.factura = true;
    this.guardarPedidos();
    this.habilitaBotones(this.pedidos[this.indexPedidoActual].productos);
  }
  

  generarFactura() {

  }

  getUser(nit: string) {
    this.clientService.getCliente( Number(nit))
      .subscribe( (resp: any ) => {

          this.clientTemp = resp.cliente;

          if (this.clientTemp === undefined) {
            this.clienteExiste = false;
          } else {
            this.facturaForm = this.fb.group({
              nit: [ this.clientTemp.nit, Validators.required],
              nombre: [this.clientTemp.nombre, Validators.required ],
            });  
            this.clienteExiste = true;
          }  
        }, (err) => {
          console.log('Error', err.error.msg);
          this.clienteExiste = false;
        });
  }

  campoNoValido(dato: string){

  }

  
  
  // Limpia el pedido actual y habilita o no los botones
  limpiarPedido() {
    this.productosPedidosTemp = [];
    let indexPedido = this.pedidos.indexOf(this.pedidoTemp);
    console.log('ped-leng: ', this.pedidos.length, 'index: ', indexPedido, 'val: ', this.pedidoTemp);
    
    this.pedidos.splice(indexPedido, 1);
    this.pedidoTemp = this.pedidoClean;
    this.guardarPedidos();
  }

  // Si el arreglo esta vacio devuelve false
  habilitaBotones(pedidos: Producto[]) {

    if(pedidos.length != 0) {
      this.habilitaBoton = true;
    }
    else {
      this.habilitaBoton = false;
    }

  }

  cerrarPedido() {
    this.mostrarPedido = false;
    this.mostrarPedidos = true;
  }

}
