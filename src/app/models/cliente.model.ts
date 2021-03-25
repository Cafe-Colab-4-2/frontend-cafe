import { environment } from '../../environments/environment';

const base_url = environment.base_url; 

export class Cliente {

    constructor(
        public nit: string,
        public nombre : string,
        public apellido?: string,
        public email  ?: string,
        public telefono  ?: string,
        public direccion  ?: string,
        public img ?: string,
        public activo  ?: string,
        public usuario ?: string,
        public _id?: string,
    ) {}

    get getImage() {

        if ( !this.img ) {
            return `${base_url}/uploads/clientes/no-image`;
        }else if (this.img.includes('https')) {
            return this.img;
        }else if ( this.img) {
            return `${base_url}/uploads/clientes/${this.img}`;
        }else{
            return `${base_url}/uploads/clientes/no-image`;
        }
     } 
 }