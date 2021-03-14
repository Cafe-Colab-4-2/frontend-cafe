import { environment } from '../../environments/environment';

const base_url = environment.base_url; 

export class Producto {

    constructor(
        public categoria: string,
        public presentacion: string,
        public descripcion: string,
        public activo: string,
        public usuario: string,
        public stock: string,
        public precio_venta: string,
        public img?: string,
        public _id?: string,
    ) {}

    get getImage() {

        if ( !this.img ) {
            return `${base_url}/uploads/productos/no-image`;
        }else if (this.img.includes('https')) {
            return this.img;
        }else if ( this.img) {
            return `${base_url}/uploads/productos/${this.img}`;
        }else{
            return `${base_url}/uploads/productos/no-image`;
        }
     } 
 }

