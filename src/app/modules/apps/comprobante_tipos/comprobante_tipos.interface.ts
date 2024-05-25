import { DateTime } from "luxon";



export interface SvComprobanteTiposSchema{
    id: number;
    codigo: number;
    nombre: string;
}



export class ComprobanteTiposModel {
    id: number;
    codigo: number;
    nombre: string;
    constructor(data: SvComprobanteTiposSchema){
        this.id = data.id;
        this.codigo = data.codigo;
        this.nombre = data.nombre;
    }
    


}