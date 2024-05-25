import { Component } from '@angular/core';
import { IListColums } from 'app/shared/components/list-base/list-base.types';
import { PurchasesService } from '../purchases.service';
import { PurchasesFormComponent } from '../form/form.component';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent {
  constructor(private _crudService: PurchasesService) { }
  crudService = this._crudService
  optionsColumns: string[] = ['Editar', 'Eliminar'];

  columns: IListColums[] = [
    { 
      'name': 'ID',
      'code': 'id',
      'show': true,
    },
    {      
      'name': 'Tipo Documento',
      'code': 'tipoDocumento',
      'show': true,
    },
    {      
      'name': 'Nro Documento',
      'code': 'numero_documento',
      'show': true,
    },
    {      
      'name': 'Proveedor',
      'code': 'proveedorName',
      'show': true,
    },
    {
      'name': 'Moneda',
      'code': 'monedaDivisa',
      'show': true,
    },
    {
      'name': 'Total',
      'code': 'total',
      'show': true,
    },
    {
      'name': 'Abonado',
      'code': 'abonado',
      'show': true,
    },
    {
      'name': 'Pagado',
      'code': 'pagado',
      'show': true,
    },
    {
      'name': 'Fecha Documento',
      'code': 'fecha_documento',
      'show': false,
    },
    {
      'name': 'Fecha Vencimiento',
      'code': 'fecha_vencimiento',
      'show': false
    },

  ]

  modal = PurchasesFormComponent
}
