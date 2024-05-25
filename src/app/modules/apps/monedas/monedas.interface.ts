import { DateTime } from "luxon";



export interface SvMonedaSchema{
    id: number;
    nombre: string;
    simbolo: string;
    divisa: string;
}



export class MonedaModel {
    id: number;
    nombre: string;
    simbolo: string;
    divisa: string;

    constructor(data: SvMonedaSchema){
        this.id = data.id;
        this.simbolo = data.simbolo;
        this.nombre = data.nombre;
        this.divisa = data.divisa;
    }
    


}