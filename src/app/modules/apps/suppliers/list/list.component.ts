import { Component } from '@angular/core';
import { IListColums } from 'app/shared/components/list-base/list-base.types';
import { SuppliersService } from '../suppliers.service';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class SupplierListComponent {
  constructor(private _crudService: SuppliersService) { }
  crudService = this._crudService
  optionsColumns: string[] = ['Editar', 'Eliminar'];

  columns: IListColums[] =[
    { 
      'name': 'ID',
      'code': 'id',
      'show': true,
    },
    {      
      'name': 'Codigo',
      'code': 'codigo',
      'show': true,
    },
    {      
      'name': 'Tipo Documento',
      'code': 'documento',
      'show': true,
    },
    {      
      'name': 'Nro Documento',
      'code': 'num_documento',
      'show': true,
  },
    {      
      'name': 'Nombre',
      'code': 'nombre',
      'show': true
    },
    {
      'name': 'Razon',
      'code': 'razon',
      'show': false
    },
    {
      'name': 'Direccion',
      'code': 'addres',
      'show': true
    },
    {
      'name': 'Persona',
      'code': 'persona',
      'show': false
    },

  ]

  modalSupplier=FormComponent
}
