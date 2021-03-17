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
  public clientTemp: Cliente;
  public clienteExiste = false;
  public facturaTemp: Factura = {fecha: '', total_factura: 0, nombre_cliente: '', nit_cliente: '', usuario: '', _id: ''};
  public fechaYHora = new Date();
  public detalleFacturaTemp: DetalleFactura = {id_factura: '', id_producto : '', cantidad : 0, precio_unitario : 0, total: 0, usuario: '' }
  public facturaData: FacturaForm = { nombre_cliente: '', id_cliente: ''};
  public facturaDataTemp: FacturaForm;
  public habilitaBoton = false;
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
    this.mesas[product.mesa - 1].occuped = true;
    this.habilitaBotones(this.mesas[this.numeroMesa - 1].productos);
    this.guardarMesas();
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
    this.guardarMesas();
  }

  eliminarProductoDePedido(product: Producto) {
    let index = this.pedidos.indexOf(product);
    this.mesas[product.mesa - 1].total -= (product.precio_venta * product.cantidad);
    this.pedidos.splice( index, 1);
    this.mesas[product.mesa - 1].productos = this.pedidos;
    
    if(this.pedidos.length == 0) {
      this.mesas[product.mesa - 1].occuped = false;
      this.factura = false;
      this.mesas[this.numeroMesa -1 ].productos = this.pedidos;
      this.mesas[this.numeroMesa -1 ].total = 0;
    }
    
    this.habilitaBotones(this.mesas[this.numeroMesa - 1].productos);
    this.guardarMesas();
  }

  guardarTablas() {
    this.mesas[this.numeroMesa - 1].occuped = true;
    this.guardarMesas();
  }

  actualizarDatosMesas() {
    this.factura = true;
    this.guardarMesas();
    this.habilitaBotones(this.mesas[this.numeroMesa - 1].productos);
  }
  
  creaNuevoCliente() {
      // CREACION DE NUEVO CLIENTE
      this.clientService.crearCliente(this.facturaForm.value)
      .subscribe( (resp: any) => {

        this.clientTemp = resp.nuevoCliente; 
        this.clienteExiste = false;
        
        // Asignamos ID y NOMBRE del nuevo cliente creado
        this.creaNuevoRegistroFactura();
        
      }, (err) => {
        Swal.fire('Error: ', err.error.msg, 'error');
      }); 
  }

  generarFactura() {

    this.formSubmitted = true;
    this.factura = false;
    if( this.facturaForm.invalid ) {
      return;
    }
    
    // Si el cliente ingresado no existe se Crea un nuevo registro de clientes
    if(!this.clienteExiste) {
      this.creaNuevoCliente();
    }
    else {
      this.creaNuevoRegistroFactura();
    }
  }

  generarDetallesFacturas(facturaId: string) {
      // GENERAR NUEVO DETALLE FACTURA
      this.pedidos.forEach( pedido => {

        this.detalleFacturaTemp.cantidad = pedido.cantidad;
        this.detalleFacturaTemp.id_factura = facturaId;
        this.detalleFacturaTemp.id_producto = pedido._id;
        this.detalleFacturaTemp.total = pedido.precio_venta * pedido.cantidad;
        this.detalleFacturaTemp.precio_unitario = pedido.precio_venta;
        this.detalleFacturaTemp.usuario = this.userService.uid;
        
        this.detalleFacturaService.crearDetalleFactura(this.detalleFacturaTemp)
          .subscribe( resp => {
              console.log('DETALLE FACTURA CREADOS: ', resp);
          });
      });

      this.limpiarPedido();
      this.habilitaBotones(this.pedidos);
  }

  creaNuevoRegistroFactura() {

    // Se asignan los datos de la Factura SI EXISTE
    this.llenaDatosFactura();

    // GENERAR NUEVA FACTURA
    this.facturaService.crearFactura(this.facturaData)
    .subscribe( (res: any) => { // res devuelve un ojbeto {msj: '', nuevaFactura: []}

      this.generarDetallesFacturas(res.nuevaFactura._id);

      Swal.fire('Creado', 'Factura creada Correctamente', 'success');
    }, (err) => {
      Swal.fire('error', 'Error al crear Factura', 'error');
      console.log(err);
    })
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

  llenaDatosFactura() {
    this.facturaData.id_cliente = this.clientTemp._id;
    this.facturaData.nombre_cliente = this.clientTemp.nombre;
    this.facturaData.total_factura = this.mesas[this.numeroMesa -1 ].total;
    this.facturaData.fecha = new Date().toISOString();
  }

  limpiarPedido() {
    this.pedidos = [];
    this.mesas[this.numeroMesa -1 ].productos = this.pedidos;
    this.mesas[this.numeroMesa -1 ].occuped = false;
    this.mesas[this.numeroMesa -1 ].total = 0;
    this.guardarMesas();
    this.habilitaBotones(this.pedidos);
    this.factura = false;
  }

  habilitaBotones(pedidos: Producto[]) {

    if(pedidos.length != 0) {
      this.habilitaBoton = true;
    }
    else {
      this.habilitaBoton = false;
    }

  }

  guardarMesas() {
    localStorage.setItem('mesas',  JSON.stringify(this.mesas));
  }

}
  