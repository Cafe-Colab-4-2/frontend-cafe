import { Producto } from './../../../../models/producto.model';
import { Router } from '@angular/router';
import { DetallefacturaService } from './../../../../services/detallefactura.service';
import { DetalleFactura } from './../../../../models/detallefactura.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listardetalle',
  templateUrl: './listardetalle.component.html',
  styleUrls: ['./listardetalle.component.css']
})
export class ListardetalleComponent implements OnInit {
  // variable que almacena el codigo temporalmente para hacer pruebas
  codigo="6043a24fc9b14a00159fd972";
  // variable que almacena los detalles de factura para guardar los datos
  // que devuelve la api
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
    let nombre:string="";
    this.api.ObtenerDetalle().subscribe(data => {
      // Guardar los detalles en la variable detallesFacturas
      this.detallesFacturas=data['detallesFacturas'];
      // Recorrer el array de this.detallesFacturas
      this.detallesFacturas.forEach(element=>{
        // Buscar el producto enviando el id que corresponde a detalle factura
        this.api.BuscarProducto(this.codigo).subscribe(data=>{
          // Guardar en la variable el producto encontrado
          this.productoEncontrado=data['productos'][0];
          // Crear detalle factura con los datos de los detalles y de productos
          let nuevoProductoTemp=new Producto();
          nuevoProductoTemp._id=this.codigo;
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
        });
      });
    });
  }

  // Eliminar Detalle Factura, pasandole el id
  EliminarDetalleF(id){
    // this.api.EliminarDetalleFactura(id).subscribe(res => {
    //   console.log(res)
    // })
    console.log(id)
  }


}
