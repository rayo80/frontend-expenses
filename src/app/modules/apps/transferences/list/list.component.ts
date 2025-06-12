import { Component } from '@angular/core';
import { IListColums } from 'app/shared/components/list-base/list-base.types';
import { TransferenceService } from '../transferences.services';





@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent {
  constructor(private _crudService: TransferenceService) { }
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
      'name': 'Monto',
      'code': 'monto',
      'show': true,
    },
    {
      'name': 'Hora',
      'code': 'hora',
      'show': true,
    },
    {
      'name': 'Cargo',
      'code': 'cargoNombre',
      'show': true,
    },
    {
      'name': 'Destino',
      'code': 'destinoNombre',
      'show': true,
    },
    {
      'name': 'Observacion',
      'code': 'observacion',
      'show': true,
    },


  ]

  modal: any = null
}
