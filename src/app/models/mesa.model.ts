import { Producto } from './productos.model';
export interface Mesa {
        no: number;
        sillas: number;
        productos: Producto[];
        total: number;
        occuped: boolean;
}
