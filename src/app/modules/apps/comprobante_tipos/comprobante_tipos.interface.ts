import { DateTime } from "luxon";
import { CuentaContableModel, SvCuentaContableSchema } from "../cuentas_contables/cuentas_contables.interface";



export interface SvComprobanteTiposSchema{
    id: number;
    codigo: number;
    nombre: string;
    cta_default?: SvCuentaContableSchema;
}



export class ComprobanteTiposModel {
    id: number;
    codigo: number;
    nombre: string;
    cta_default?: CuentaContableModel;
    constructor(data: SvComprobanteTiposSchema){
        this.id = data.id;
        this.codigo = data.codigo;
        this.nombre = data.nombre;
        this.cta_default = data.cta_default ? new CuentaContableModel(data.cta_default) : null;   
    }
    
    get ctaDefaultName(): string {
        return this.cta_default ? this.cta_default.descripcion : 'No asignada';
    }

}