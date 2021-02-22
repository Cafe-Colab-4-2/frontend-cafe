import { Usuario } from '../models/usuario.model';

export interface CargarUsuarios {
    total : Number;
    usuarios: Usuario[];
}