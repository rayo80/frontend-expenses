import { CuentaContableModel, SvCuentaContableSchema } from "../cuentas_contables/cuentas_contables.interface";
import { SvMonedaSchema } from "../monedas/monedas.interface";
import { PurchasesModel, SvPurchasesSchema } from "../purchases/purchases.interface";



export interface SvPaymentMethodSchema{
    id: number;
    name: string;
}

export interface SvPaymentSchema{
    id: number;
    compra: SvPurchasesSchema;
    detalle: string;
    fecha: Date;
    moneda: SvMonedaSchema;
    metodo: SvPaymentMethodSchema;
    referencia: string;
    total: number;
    cuenta_destino?: SvCuentaContableSchema;
}


export class PaymentModel {
    id: number;
    compra: PurchasesModel;
    referencia: string;
    detalle: string;
    metodo: SvPaymentMethodSchema;
    moneda: SvMonedaSchema;
    cuenta_destino: CuentaContableModel | null;
    fecha: Date;
    total: number;
    
    constructor(data: SvPaymentSchema){
        this.id = data.id;
        this.fecha = data.fecha;
        this.moneda = data.moneda;
        this.detalle = data.detalle;
        this.referencia = data.referencia;
        this.total = data.total;
        this.compra = new PurchasesModel(data.compra);
        this.metodo = data.metodo;
        this.cuenta_destino = data.cuenta_destino ? new CuentaContableModel(data.cuenta_destino) : null;
    }

    get monedaDivisa() : string {
        return this.moneda.divisa;
    }

    get metodoName() : string {
        return this.metodo.name;
    }
}
