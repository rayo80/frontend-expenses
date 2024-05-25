import { DateTime } from "luxon";



export interface SvDocIdentidadTipoSchema{
    id: number;
    nombre: number;
    codigo: number
}



export class DocIdentidadTipoModel {
    id: number;
    nombre: number;
    codigo: number

    constructor(data: SvDocIdentidadTipoSchema){
        this.id = data.id;
        this.codigo = data.codigo;
        this.nombre = data.nombre;
    }
    


}