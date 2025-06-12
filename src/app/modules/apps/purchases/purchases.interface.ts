
import { DateTime } from "luxon";
import { ProductModel, SvProductSchema } from "../productos/productos.interface";
import { SvMonedaSchema } from "../monedas/monedas.interface";


interface SvProviderSimpleSchema{
    id: number;
    nombre: string;
}

interface SvComprobanteTiposSchema{
    id: number;
    nombre: string;
}


export interface SvPurchaseItemSchema{
    id: number;
    cantidad: number,
    producto: ProductModel,
    total: number
}

export class PurchasesItemModel {
    id: number;
    producto: ProductModel;
    total: number;
    cantidad: number

    constructor(data: SvPurchaseItemSchema){
        this.id = data.id;
        this.producto = data.producto;
        this.cantidad = data.cantidad;
        this.total = data.total
    }

    get igv() : number {
        return this.total * 0.18;
    }

    itemForm(){
        return {
            producto: this.producto.id,
            cantidad: this.cantidad,
            total: this.total,
            igv: this.igv
        }
    }
}

export interface SvPurchasesSchema{
    id: number;
    proveedor: SvProviderSimpleSchema;
    tipo_documento: SvComprobanteTiposSchema;
    observacion: string;
    num_documento: string;
    fecha: Date;
    fecha_vencimiento: Date;
    fecha_documento: Date;
    pagada: boolean;
    abonado: number;
    moneda: SvMonedaSchema;
    total: number;
    saldo: number;
}

export interface SvPurchaseDetailSchema extends SvPurchasesSchema{
    items: SvPurchaseItemSchema[];
}


export class PurchasesModel {
    id: number;
    inicio: DateTime;
    tipo_documento: SvComprobanteTiposSchema;
    numero_documento: string;
    observacion: string;
    proveedor: SvProviderSimpleSchema;
    moneda: SvMonedaSchema;
    fecha_documento: Date;
    fecha_vencimiento: Date;
    abonado: number;
    pagado: boolean;
    saldo: number;
    total: number;
    
    constructor(data: SvPurchasesSchema){
        this.id = data.id;
        this.abonado = data.abonado;
        this.tipo_documento = data.tipo_documento;
        this.numero_documento = data.num_documento;
        this.fecha_documento = data.fecha_documento;
        this.fecha_vencimiento = data.fecha_vencimiento;
        this.moneda = data.moneda;
        this.total = data.total;
        this.pagado = data.pagada;
        this.observacion = data.observacion;
        this.proveedor = data.proveedor;
        this.saldo = data.saldo;
    }
    
    get proveedorName() : string {
        return this.proveedor.nombre;
    }
        
    get tipoDocumento() : string {
        return this.tipo_documento.nombre;
    }

    get monedaDivisa() : string {
        return this.moneda.divisa;
    }
}


export class PurchasesDetailModel extends PurchasesModel {
    items: PurchasesItemModel[];
    constructor(data: SvPurchaseDetailSchema){
        super(data);
        this.items = Array.isArray(data.items) ? data.items.map(item => new PurchasesItemModel(item)): [];
}}

