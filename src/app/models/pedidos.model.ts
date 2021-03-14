import { Producto } from './productos.model';
export interface Pedido {
    mesa: number;
    productos: Producto[];
    cantidad: number;
}