import { Usuario } from "./usuario.model";

export class Factura {
  id:any;
  fecha:Date;
  usuario:Usuario;
  total_factura:number;

  constructor(){
    this.id="";
    this.fecha=new Date();
    this.total_factura=0;
  }
}
