import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProductService } from '../../../services/productos.service';
import { Producto } from '../../../models/producto.model';
import { BusquedasService } from '../../../services/busquedas.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: [
  ]
})
export class ProductComponent {

  public nuevoproducto = true;
  public productos: Producto[] = [];
  public productosTemp: Producto[] = [];
  public totalproductos: number;
  public desde: number = 0;
  public cargando = true;
  public editinProductId = "";
  public editarProducto= false;

  public formSubmitted = false;

  public registerForm = this.fb.group({
    categoria: ['', Validators.required],
    presentacion: [ '', [Validators.required,] ],
    stock: [ '', Validators.required ],
    precio_venta: [ '', Validators.required ],
    descripcion: [ '', Validators.required ],
    userId: [this.userService.uid, Validators.required ],
  
  });

  constructor( 
                private fb: FormBuilder, 
                private userService: UsersService,
                private productService: ProductService,
                private busquedaSerivce: BusquedasService ) { 
                  this.cargarproductos();
                  this.cargando = true;
                }
//crear el producto

  crearproducto() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if( this.registerForm.invalid ) {
      console.log ("error invalido")
      return;
    }

    // Realizar Posteo
    this.productService.crearProducto( this.registerForm.value )
      .subscribe( (resp) => {
        console.log('producto creado');
        console.log(resp);
        Swal.fire('Creado:', 'producto Creado Correctamente', 'success');

        // Se oculta el formulario si el producto fue creado correctamente
        // this.nuevoproducto = false;

      }, (err) => {
        Swal.fire('Error: ', err.error.msg, 'error');
        console.log(err.error);
        
      }
      );
  }

  //Validar la informacion
  campoNoValido( campo: string): boolean {
    if( this.registerForm.get(campo).invalid && this.formSubmitted ) {
      return true;
    }
    else {
      return false;
    }
  }


//cargar productos
  cargarproductos( ){
    this.productService.cargarProducto( this.desde  )
      .subscribe( resp => {
        console.log(resp);
        this.productos = resp.productos;
        this.productosTemp = resp.productos; //se usa temporalmente
        this.totalproductos = resp.total; //total de registro de productos que hay
        
      this.cargando = false; //desplegar o mostrar el icono
      });
  }

  //paginacion
  cambiarPagina( valor: number ) {
    this.desde += valor;

    if ( this.desde < 0 ) {
      this.desde = 0;
    } else if ( this.desde >= this.totalproductos ) {
      this.desde -= valor; 
    }

    this.cargarproductos();
  }

  //buscar producto
  buscar( termino: string) {
    if( termino.length === 0) {
      return this.productos = [ ...this.productosTemp ];
    }

    this.busquedaSerivce.buscar( 'productos', termino)
      .subscribe( resp => {
       // this.productos = resp
      }
      );
    
  }


  eliminarproducto( producto: Producto ) {

  console.log(producto);


    const swal = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swal.fire({
      title: 'Delete user: ' + producto.descripcion + 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {

      if(result.value) {
        
        if (result.isConfirmed) {
          
          this.productService.eliminarProducto( producto )
            .subscribe( resp => {              
              swal.fire(
              'Deleted!',
              'User has been deleted.',
              'success'
              )

              this.cargarproductos();
            });
          
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
        ) {
          swal.fire(
            'Cancelled',
            'User is safe :)',
            'error'
            )
          }
      }
    })
  }
  cargarproducto(producto: Producto) {
    this.editinProductId = producto._id;
    
    this.editarProducto = true;
    this.registerForm = this.fb.group({
      categoria: [producto.categoria, Validators.required],
    presentacion: [producto.presentacion, [Validators.required,] ],
    stock: [producto.stock, Validators.required ],
    precio_venta: [producto.precio_venta, Validators.required ],
    descripcion: [producto.descripcion, Validators.required ],
    userId: [this.userService.uid, Validators.required ],
    } 
    )}


}
