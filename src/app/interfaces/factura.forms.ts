export interface Factura {
    fecha : string,
    total_factura : number,
    nombre_cliente : string,
    nit_cliente : string,
    usuario: string,
    _id?: string,
    id_cliente ?: string
}

export interface DetalleFactura {
    id_factura : string,
    id_producto : string,
    cantidad : number,
    precio_unitario : number,
    total: number,
    usuario: string,
    _id?: string
}

export interface FacturaForm {
    nombre_cliente: string,
    id_cliente: string,
    total_factura?: number
}


    