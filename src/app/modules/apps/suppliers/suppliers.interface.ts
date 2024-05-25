import { SvDocIdentidadTipoSchema } from './../doc_identidad_tipos/doc_identidad_tipos.interface';
import { DateTime } from "luxon";



export interface SvSupplierSchema{
    id: number;
    tipo_documento: SvDocIdentidadTipoSchema;
    num_documento: string;
    razon: string;
    nombre: string;
    address: string;
    codigo: string;
    persona: string
}



export class SupplierModel {
    id: number;
    tipo_documento?: SvDocIdentidadTipoSchema;
    num_documento: string;
    nombre: string;
    razon: string;
    addres: string;
    codigo: string;
    persona: string;

    constructor(data: SvSupplierSchema){
        this.id = data.id;
        this.codigo = data.codigo;
        this.nombre = data.nombre;
        this.tipo_documento = data.tipo_documento;
        this.num_documento = data.num_documento;
        this.razon = data.razon;
        this.addres = data.address;
        this.persona = data.persona;
    }
    
    get documento(){
        return this.tipo_documento?.codigo + '-' + this.tipo_documento?.nombre
    }

}