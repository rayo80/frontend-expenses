
export interface IMenuItems {
    title: string;
    label: string;
    icon: string;
    codigo?: string;
    actions: ActionsMenu | string;
    alterSave?:boolean;
    withModal?: string;
    needColumn?: string;
}

export interface ICrudMethods {
    CREATE: string;
    EDIT: string;
    DELETE: string;
}

export enum ActionsMenu {
    CREATE = 'CREATE',
    EDIT = 'EDIT',
    DELETE = 'DELETE',
}