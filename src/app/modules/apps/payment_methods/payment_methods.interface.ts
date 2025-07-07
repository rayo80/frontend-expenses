export interface SvConstantsSchema{
    id: number;
    name: string;
}

export class ConstantsModel {
    id: number;
    name: string;

    constructor(data: SvConstantsSchema){
        this.id = data.id;
        this.name = data.name;
    }
    


}