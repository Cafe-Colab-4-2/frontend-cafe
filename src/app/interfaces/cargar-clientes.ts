import { Cliente } from '../models/cliente.model';


export interface CargarClientes {
    total : number;
    clientes: Cliente[];
}