export class Producto {
  _id:any;
  categoria:string;
  presentacion:string;
  descripcion:string;
  stock:number;
  precio_venta:number;
  total:number;

  constructor(){
    this._id="0";
    this.categoria="";
    this.presentacion="";
    this.descripcion="";
    this.stock=0;
    this.precio_venta=0;
    this.total=0;
  }
}
