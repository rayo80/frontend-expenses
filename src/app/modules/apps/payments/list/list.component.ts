import { Component } from '@angular/core';
import { IListColums } from 'app/shared/components/list-base/list-base.types';
import { PaymentsService } from '../payments.service';
import { PaymentsFormComponent } from '../form/form.component';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent {
  constructor(private _crudService: PaymentsService) { }
  crudService = this._crudService
  optionsColumns: string[] = ['Editar', 'Eliminar'];

  columns: IListColums[] = [
    { 
      'name': 'ID',
      'code': 'id',
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
      'name': 'Medio de Pago',
      'code': 'metodoName',
      'show': true,
    },
    {
      'name': 'Ref.',
      'code': 'referencia',
      'show': true,
    },
    {
      'name': 'Fecha Documento',
      'code': 'fecha',
      'show': false,
    },


  ]

  modal: any = PaymentsFormComponent
}
