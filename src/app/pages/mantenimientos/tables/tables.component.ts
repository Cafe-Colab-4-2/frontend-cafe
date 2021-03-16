import { CdkDragDrop, CdkDragEnd, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Mesa } from '../../../models/mesa.model';
import { Producto } from '../../../models/productos.model';
import Swal from 'sweetalert2';
import { Pedido, CostosTotalesMesas } from '../../../models/pedidos.model';
import { ProductService } from '../../../services/product.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ClienteService } from '../../../services/client.service';
import { Cliente } from '../../../models/cliente.model';
import { Factura, DetalleFactura, FacturaForm } from '../../../interfaces/factura.forms';
import { UsersService } from '../../../services/users.service';
import { FacturaService } from '../../../services/factura.service';
import { DetalleFacturaService } from '../../../services/detalle-factura.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html'
})
export class TablesComponent implements OnInit {

  $txtInputTermino : string;

  public factura = false;
  public formSubmitted = false;
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
  public cliente: Cliente;
  public client: any;
  public clienteExiste = false;
  public facturaTemp: Factura = {fecha: '', total_factura: 0, nombre_cliente: '', nit_cliente: '', usuario: '', _id: ''};
  public fechaYHora = new Date();
  public detalleFacturaTemp: DetalleFactura;
  public facturaData: FacturaForm = { nombre_cliente: '', id_cliente: ''}
  public habilitaBoton = false;
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


  public facturaForm: FormGroup;

  constructor( 
    private productService: ProductService,
    private userService: UsersService,
    private facturaService: FacturaService,
    private detalleFacturaService: DetalleFacturaService,
    private fb: FormBuilder,
    private clientService: ClienteService ) { }

  ngOnInit(): void {
    this.cargarProductos();
    // this.verificaMesas();
    this.mesas = this.ponerMesaYDatos();
    this.formulario();
  }

  formulario() {
    this.facturaForm = this.fb.group({
      nit: ['', Validators.required],
      nombre: [ '', Validators.required, ],
    }  );
  }

  
  campoNoValido( campo: string): boolean {
    if( this.facturaForm.get(campo).invalid && this.formSubmitted ) {
      return true;
    }
    else {
      return false;
    }
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
    this.factura = false;
    
    this.modalProductos(true);
    this.numeroMesa = noMesa;
    this.pedidos = this.mesas[noMesa -1].productos;
    this.habilitaBotones(this.pedidos);
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

    this.habilitaBotones(this.mesas[this.numeroMesa - 1].productos);
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

    this.habilitaBotones(this.mesas[this.numeroMesa - 1].productos);
  }

  guardarTablas() {
    this.mesas[this.numeroMesa - 1].occuped = true;
    localStorage.setItem('mesas',  JSON.stringify(this.mesas));
  }

  actualizarDatosMesas() {
    this.factura = true;
    localStorage.setItem('mesas',  JSON.stringify(this.mesas));

    this.habilitaBotones(this.mesas[this.numeroMesa - 1].productos);
  }
  

  generarFactura() {

    this.formSubmitted = true;

    if( this.facturaForm.invalid ) {
      return;
    }

    this.factura = false;
    
    // Si el cliente ingresado no existe se Crea un nuevo registro de clientes
    if(!this.clienteExiste) {
        // CREACION DE NUEVO CLIENTE
      this.clientService.crearCliente(this.facturaForm.value)
      .subscribe( resp => {
          let cli: Cliente;
          cli = this.facturaForm.value;
          this.client = resp; 
          this.facturaTemp.nit_cliente = cli.nit;
          this.facturaTemp.nombre_cliente = cli.nombre;
          this.facturaTemp.id_cliente = this.client.cliente._id;

          this.facturaData.id_cliente = this.client.cliente._id;
          this.facturaData.nombre_cliente = this.client.cliente.nombre;
    
          // console.log('CREADOOOOOOOO', resp, ' TEMP CLIENT SERVICIO: ', this.facturaTemp);
          this.generaNuevaFactura();

          this.clienteExiste = false;
          
          // Swal.fire('Generado', 'Usuario Creado Correctamente', 'success');
        }, (err) => {
          Swal.fire('Error: ', err.error.msg, 'error');
          // console.log(err.error);
        }); 
    } else {
      Swal.fire('Existe', 'El Usuario Ya Existe', 'success');
      this.generaNuevaFactura();
    }
      
    // Se completa la informacion de la factura a crear
    this.facturaTemp.fecha = new Date().toISOString();
    this.facturaTemp.total_factura = this.mesas[this.numeroMesa -1 ].total;
    this.facturaTemp.usuario = this.userService.uid;

    
    
        

      // GENERAR NUEVO DETALLE FACTURA
      // this.pedidos.forEach(pedido => {
      //   this.detalleFacturaTemp.cantidad = pedido.cantidad;
      //   this.detalleFacturaTemp.id_factura = this.facturaTemp._id;
      //   this.detalleFacturaTemp.id_producto = pedido._id;
      //   this.detalleFacturaTemp.precio_unitario = pedido.precio_venta;
      //   this.detalleFacturaTemp.total = pedido.cantidad * pedido.precio_venta;
      //   this.detalleFacturaTemp.usuario = this.userService.uid;
        
      //   this.detalleFacturaService.crearDetalleFactura(this.detalleFacturaTemp)
      //     .subscribe( resp => {
      //         console.log('DETALLE FACTURA CREADOS: ', resp);
      //     });
      // });

      

    this.limpiarPedido();
    this.habilitaBotones(this.pedidos);
  }

  generaNuevaFactura() {
          // GENERAR NUEVA FACTURA
          this.facturaService.crearFactura(this.facturaData)
          .subscribe( res => {
            this.facturaData = res;
            // this.facturaTemp = res;
            console.log('Factura Creada: ', res);
            Swal.fire('Creado', 'Factura creada Correctamente', 'success');
          }, (err) => {
            Swal.fire('error', 'Error al crear Factura', 'error');
            console.log(err);
          })
  }

  getUser(nit: string) {
    this.clientService.getCliente( Number(nit))
      .subscribe( (resp ) => {
          this.client = resp;   
          this.facturaForm = this.fb.group({
            nit: [ this.client.cliente.nit, Validators.required],
            nombre: [this.client.cliente.nombre, Validators.required ],
          });  

          this.facturaTemp.nit_cliente = this.client.cliente.nit;
          this.facturaTemp.nombre_cliente = this.client.cliente.nombre;
          this.facturaTemp.id_cliente = this.client.cliente._id;

          this.facturaData.id_cliente = this.client.cliente._id;
          this.facturaData.nombre_cliente = this.client.cliente.nombre;
          this.facturaData.total_factura = this.mesas[this.numeroMesa -1 ].total;
          

          if(this.client.cliente.nombre.length != 0){
            this.clienteExiste = true;
          }
          else {
            this.clienteExiste = false;
          }
          
        }, (err) => {
          console.log('Error', err.error.msg);
          this.clienteExiste = false;
        });
        
  }

  limpiarPedido() {
    this.pedidos = [];
    this.mesas[this.numeroMesa -1 ].productos = this.pedidos;
    this.mesas[this.numeroMesa -1 ].occuped = false;
    this.mesas[this.numeroMesa -1 ].total = 0;
    localStorage.setItem('mesas',  JSON.stringify(this.mesas));
    this.habilitaBotones(this.pedidos = []);
    this.factura = false;
  }

  habilitaBotones(pedidos: Producto[]) {

    if(pedidos.length != 0) {
      this.habilitaBoton = true;
    }
    else {
      this.habilitaBoton = false;
    }

    // console.log(this.pedidos.length);
    
  }

}
  