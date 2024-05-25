
export interface IListColums {
    name: string;
    code: string;
    sort?: string;
    class?: string;
    ancho?: number;
    show?: boolean;
}

export interface ModelId {
    id: number;
}


// este de aca es lo que por defecto siempre tiene una respuesta de servidor (id)
export interface ICrudModel {
    id: number;
    activo?: boolean;
    anulado?: boolean;
    // toForm();
    // toResponse();
    // toFilter();
  }

export interface IMenu {
    icon: string;
    label: string;
    code?: string;
}


export interface RelateSchema{
    id: number;
    name: string;
}

export interface ViewerInterface {
    getList(): void;

}


