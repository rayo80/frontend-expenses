import { get } from "lodash";
import { SvCentralSchema } from "../caja_central/caja_central.interface";
import { SvMonedaSchema } from "../monedas/monedas.interface";
import { PurchasesModel, SvPurchasesSchema } from "../purchases/purchases.interface";


export interface SvTransferenceSchema{
    id: number;
    detalle: string;
    dia: Date;
    moneda: SvMonedaSchema;
    observacion: string;
    hora: Date;
    monto: number;
    cargo: SvCentralSchema;
    destino: SvCentralSchema;
}


export class TransferenceModel {
    id: number;
    detalle: string;
    dia: Date;
    moneda: SvMonedaSchema;
    observacion: string;
    hora: Date;
    monto: number;
    cargo: SvCentralSchema;
    destino: SvCentralSchema;
    
    constructor(data: SvTransferenceSchema){
        this.id = data.id;
        this.dia = data.dia;
        this.hora = data.hora;
        this.moneda = data.moneda;
        this.detalle = data.detalle;
        this.observacion = data.observacion;
        this.monto = data.monto;
        this.cargo = data.cargo;
        this.destino = data.destino;
    }

    get monedaDivisa() : string {
        return this.moneda.divisa;
    }
    get cargoNombre() : string {
        return this.cargo?.nombre;
    }
    get destinoNombre() : string {
        return this.destino?.nombre;
    }
}