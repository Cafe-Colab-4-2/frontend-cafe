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
    fecha : string,
    total_factura: number,
    id_cliente: string,
    usuario: string,
}
    