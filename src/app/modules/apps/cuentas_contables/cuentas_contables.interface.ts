import { DateTime } from "luxon";



export interface SvCuentaContableSchema{
    id: number;
    descripcion: string;
    codigo: string
}



export class CuentaContableModel {
    id: number;
    descripcion: string;
    codigo: string

    constructor(data: SvCuentaContableSchema){
        this.id = data.id;
        this.codigo = data.codigo;
        this.descripcion = data.descripcion;
    }
    

}