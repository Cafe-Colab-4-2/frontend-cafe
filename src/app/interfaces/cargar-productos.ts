import { Producto } from '../models/productos.model';

export interface CargarProductos {
    total : number;
    productos:Producto[];
}