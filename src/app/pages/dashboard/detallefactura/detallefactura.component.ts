import { Router } from '@angular/router';
import { DetallefacturaService } from './../../../services/detallefactura.service';
import { Producto } from './../../../models/producto.model';
import { DetalleFactura } from './../../../models/detallefactura.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detallefactura',
  templateUrl: './detallefactura.component.html',
  styleUrls: ['./detallefactura.component.css']
})
export class DetallefacturaComponent implements OnInit {

  detallesFacturas:DetalleFactura[]=[];
  // Variable que guarda los nuevos detalles y para mostrarlo en el html
  nuevoDetalleFactura:DetalleFactura[]=[];
  // Variable que guarda los nuevos productos
  nuevoProducto:Producto[]=[];
  // Variable para guardar el producto encontrado
  productoEncontrado:Producto;
  constructor(public api:DetallefacturaService, public router:Router) { }

  ngOnInit(): void {
    this.ObtenerDetalleF();
    // this.BuscarNombreProducto(this.codigo);
  }

  // Función que muestra los detalles facturas ingresados
  ObtenerDetalleF() {
    this.api.ObtenerDetalle().subscribe(data => {
      // Guardar los detalles en la variable detallesFacturas
      this.detallesFacturas=data['detallesFacturas'];
      // console.log(this.detallesFacturas);
      // Recorrer el array de this.detallesFacturas
      this.detallesFacturas.forEach(element=>{
        // Buscar el producto enviando el id que corresponde a detalle factura
        this.api.BuscarProducto(element.id_producto).subscribe(data=>{
          this.productoEncontrado=data['productos'][0];
          // console.log(this.productoEncontrado);
          let nuevoProductoTemp=new Producto();
          nuevoProductoTemp._id=this.productoEncontrado._id;
          nuevoProductoTemp.categoria=this.productoEncontrado.categoria;
          nuevoProductoTemp.precio_venta=this.productoEncontrado.precio_venta;
          nuevoProductoTemp.presentacion=this.productoEncontrado.presentacion;
          nuevoProductoTemp.descripcion=this.productoEncontrado.descripcion;
          nuevoProductoTemp.stock=this.productoEncontrado.stock;
          nuevoProductoTemp.total=this.productoEncontrado.total;
          let nuevoDetalleTemp=new DetalleFactura();
          nuevoDetalleTemp.id_factura=element.id_factura;
          nuevoDetalleTemp.id_producto=element.id_producto;
          nuevoDetalleTemp.cantidad=element.cantidad;
          nuevoDetalleTemp.precio_unitario=element.precio_unitario;
          nuevoDetalleTemp.total=element.total;
          nuevoDetalleTemp.productos=nuevoProductoTemp;
          this.nuevoDetalleFactura.push(nuevoDetalleTemp);
        })
      });
    });
  }
}
