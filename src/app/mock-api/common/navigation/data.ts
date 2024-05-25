/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'compras',
        title: 'Compras',
        type : 'basic',
        icon : 'heroicons_outline:briefcase',
        link : '/purchases'
    },
    {
        id   : 'pagos',
        title: 'Pagos',
        type : 'basic',
        icon : 'heroicons_outline:currency-dollar',
        link : '/pagos'
    },
    {
        id   : 'productos',
        title: 'Productos',
        type : 'basic',
        icon : 'heroicons_outline:document-minus',
        link : '/productos'
    },
    {
        id   : 'comprobantes',
        title: 'Tipos de Comprobantes',
        type : 'basic',
        icon : 'heroicons_outline:document-check',
        link : '/comprobante_tipos'
    },
    {
        id   : 'suppliers',
        title: 'Proveedores',
        type : 'basic',
        icon : 'heroicons_outline:user-group',
        link : '/suppliers'
    },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
