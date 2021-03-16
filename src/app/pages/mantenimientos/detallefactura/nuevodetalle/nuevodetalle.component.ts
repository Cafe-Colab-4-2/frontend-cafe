import { Producto } from './../../../../models/producto.model';
import { DetallefacturaService } from './../../../../services/detallefactura.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nuevodetalle',
  templateUrl: './nuevodetalle.component.html',
  styleUrls: ['./nuevodetalle.component.css']
})
export class NuevodetalleComponent implements OnInit {
  public formDetalle:FormGroup;
  // arreglo que guarda los nuevos productos que guarda el nuevo producto
  nuevoProducto:Producto[]=[];
  // arreglo que guarda los productos que devuelve al consumir la api
  productos:Producto[]=[];


  constructor(public api:DetallefacturaService, public router:Router,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.ValidarFormulario();
    this.ObtenerProductos();
  }
  //Validar los datos del formulario
  ValidarFormulario(){
    this.formDetalle=this.formBuilder.group({
      id_factura:['',Validators.required],
      cantidad:['', Validators.required],
      id_producto:['',Validators.required],
      precio_unitario:[''],
      total:['']
    })
  }

  ObtenerProductos(){
    this.api.ObtenerProductos().subscribe(data=>{
      this.productos=data['productos'];
      // console.log(this.productos);
      this.productos.forEach(element=>{
        let nuevoProductoTemp=new Producto();
        nuevoProductoTemp._id=element._id;
        nuevoProductoTemp.categoria=element.categoria;
        nuevoProductoTemp.descripcion=element.descripcion;
        nuevoProductoTemp.presentacion=element.presentacion;
        nuevoProductoTemp.stock=element.stock;
        nuevoProductoTemp.precio_venta=element.precio_venta;
        nuevoProductoTemp.total=element.total;
        this.nuevoProducto.push(nuevoProductoTemp);
      });
    });
  }

  get controles(){
    return this.formDetalle.controls;
  }

  agregarDetalle() {
    //obtener todos los productos
      const detalle=this.formDetalle.value;
      console.log(detalle);
      this.api.crearDetalle(detalle).subscribe(res => {
        console.log('Detalle Creado');
        // this.router.navigateByUrl('post/index');
      })
   }
  //  Función que obtiene el precio del producto y calcula el precio total
   ObtenerCodigo(_id){
    // console.log(this.nuevoProducto)
    console.log(_id);
    let precioProducto:number=0;
    // buscar el precio del producto seleccionado
    this.nuevoProducto.forEach(element => {
      if(element._id==_id){
         precioProducto=element.precio_venta;
      }
    })
    // se crean los valores para los dos campos
    // con get y value se obtiene el valor del campo
    const response={
      precio_unitario:precioProducto,
      total:precioProducto * this.formDetalle.get('cantidad').value
    };

    this.formDetalle.patchValue({
      precio_unitario: response.precio_unitario,
      total:response.total
    })
   }
}
