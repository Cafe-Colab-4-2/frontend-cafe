import { Producto } from './producto.model';

export class DetalleFactura {
  id_factura:any;
  id_producto:any;
  cantidad:number;
  precio_unitario:number;
  total:number;
  productos:Producto;

  constructor(){
    // this.id_factura="0";
    // this.id_producto="0";
    // this.cantidad=0;
    // this.precio_unitario=0;
    // this.total=0;
  }

  calcularPrecioTotal(){
    return this.productos.precio_venta*this.cantidad;
  }
}

