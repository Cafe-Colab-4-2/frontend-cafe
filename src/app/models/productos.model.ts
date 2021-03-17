import { environment } from '../../environments/environment';

const base_url = environment.base_url; 

export class Producto {

    constructor(
        public categoria: string,
        public presentacion: string,
        public descripcion: string,
        public activo: boolean,
        public usuario: string,
        public stock: number,
        public precio_venta: number,
        public img?: string,
        public _id?: string,
        public mesa?: number,
        public cantidad?: number
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