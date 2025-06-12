import { DateTime } from "luxon";
import { SvMonedaSchema } from "../monedas/monedas.interface";



export interface SvCentralSchema{
    id: number;
    chica: Boolean;
    moneda: SvMonedaSchema;
    total: number;
    nombre: string;
}


export class CentralModel {
    id: number;
    chica: Boolean;
    moneda: SvMonedaSchema;
    total: number;
    nombre: string;


    constructor(data: SvCentralSchema){
        this.id = data.id;
        this.chica = data.chica;
        this.nombre = data.nombre;
        this.moneda = data.moneda;
        this.total = data.total;
    }
    
}