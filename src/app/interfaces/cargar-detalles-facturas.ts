import { DetalleFactura } from './factura.forms';
import { Factura } from '../models/factura.model';

export interface CargarDetallesFacturas {
    total : number;
    detallesFacturas: DetalleFactura[];
}

export interface CargarFacturas {
    total: number;
    facturas: Factura[];
}