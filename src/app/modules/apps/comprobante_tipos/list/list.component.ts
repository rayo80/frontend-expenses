
import { Component } from '@angular/core';
import { IListColums } from 'app/shared/components/list-base/list-base.types';
import { ComprobanteTiposService } from '../comprobante_tipos.service';
import { FormComponent } from '../form/form.component';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent {
  constructor(private _crudService: ComprobanteTiposService) { }
  crudService = this._crudService
  optionsColumns: string[] = ['Editar', 'Eliminar'];

  columns: IListColums[] =[
    { 
      'name': 'ID',
      'code': 'id',
      'show': true
    },
    {      
      'name': 'Nombre',
      'code': 'nombre',
      'show': true
    },
    {      
      'name': 'Codigo',
      'code': 'codigo',
      'show': true
    },
        {      
      'name': 'Cuenta Contable por Defecto',
      'code': 'ctaDefaultName',
      'show': true
    },
  ]

  crudMethods = [];
  modal: any = FormComponent
}
