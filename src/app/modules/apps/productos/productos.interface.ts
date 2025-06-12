import { DateTime } from "luxon";
import { SvCuentaContableSchema } from "../cuentas_contables/cuentas_contables.interface";



export interface SvProductSchema{
    id: number;
    name: number;
    code: number;
    price: number;
    purchase_price: number;
    se_compra: boolean;
    se_vende: boolean;
    cta_ingreso: SvCuentaContableSchema;
    cta_salida: SvCuentaContableSchema;
}


export class ProductModel {
    id: number;
    name: number;
    codigo: number;
    precio: number;
    precio_compra: number;
    se_vende: boolean;
    se_compra: boolean;
    cta_ingreso?: SvCuentaContableSchema;
    cta_salida?: SvCuentaContableSchema;

    constructor(data: SvProductSchema){
        this.id = data.id;
        this.codigo = data.code;
        this.name = data.name;
        this.precio = data.price;
        this.precio_compra = data.purchase_price;
        this.cta_ingreso = data.cta_ingreso;
        this.cta_salida = data.cta_salida;
        this.se_compra = data.se_compra;
        this.se_vende = data.se_vende;
    }

    get ctaIngresoCodigo() : string {
        return this.cta_ingreso?.codigo;
    }

    get ctaIngresoDescripcion() : string {
        return this.cta_ingreso?.descripcion;
    }

    get ctaSalidaCodigo() : string {
        return this.cta_salida?.codigo;
    }

    get ctaSalidaDescripcion() : string {
        return this.cta_salida?.descripcion;
    }
}