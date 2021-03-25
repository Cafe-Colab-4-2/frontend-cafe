export class Factura {

    constructor(
        public fecha: string,
        public total_factura: number,
        public id_cliente: string,
        public usuario: string,
        public _id?: string,
    ) {}
 }

