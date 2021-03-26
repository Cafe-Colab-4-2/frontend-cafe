export class DetalleFactura {

    constructor(
        public id_factura: string,
        public id_producto: string,
        public cantidad: number,
        public precio_unitario: number,
        public total: number,
        public usuario: string,
        public _id?: string,
    ) {}

 }

