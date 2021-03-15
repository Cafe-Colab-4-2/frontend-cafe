import { Producto } from './productos.model';
export interface Pedido {
    mesa: number;
    productos: Producto[];
    cantidad: number;
}

export interface CostosTotalesMesas {
    total: number;
    mesa: number;
}