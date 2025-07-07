import { DateTime } from "luxon";
import { CuentaContableModel, SvCuentaContableSchema } from "../cuentas_contables/cuentas_contables.interface";



export interface SvComprobanteTiposSchema{
    id: number;
    codigo: number;
    nombre: string;
    cta_default?: SvCuentaContableSchema;
    cta_cobrar?: SvCuentaContableSchema;
}



export class ComprobanteTiposModel {
    id: number;
    codigo: number;
    nombre: string;
    cta_default?: CuentaContableModel;
    cta_cobrar?: SvCuentaContableSchema;
    constructor(data: SvComprobanteTiposSchema){
        this.id = data.id;
        this.codigo = data.codigo;
        this.nombre = data.nombre;
        this.cta_default = data.cta_default ? new CuentaContableModel(data.cta_default) : null;
        this.cta_cobrar = data.cta_cobrar ? new CuentaContableModel(data.cta_cobrar) : null;    
    }
    
    get ctaDefaultName(): string {
        return this.cta_default ? this.cta_default.descripcion : 'No asignada';
    }

    get ctaCobrarName(): string {
        return this.cta_cobrar ? this.cta_cobrar.descripcion : 'No asignada';
    }
}