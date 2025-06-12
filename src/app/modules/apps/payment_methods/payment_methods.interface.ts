export interface SvConstantsSchema{
    id: number;
    name: number;
}

export class ConstantsModel {
    id: number;
    name: number;

    constructor(data: SvConstantsSchema){
        this.id = data.id;
        this.name = data.name;
    }
    


}