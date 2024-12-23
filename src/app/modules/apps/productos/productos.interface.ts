import { DateTime } from "luxon";



export interface SvProductSchema{
    id: number;
    name: number;
    code: number;
    price: number;
}



export class ProductModel {
    id: number;
    name: number;
    codigo: number;
    precio: number

    constructor(data: SvProductSchema){
        this.id = data.id;
        this.codigo = data.code;
        this.name = data.name;
        this.precio = data.price
    }

}