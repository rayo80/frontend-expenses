import { ProductsService } from './../productos.service';
import { Component } from '@angular/core';
import { IListColums } from 'app/shared/components/list-base/list-base.types';
import { FormComponent } from '../form/form.component';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent {
  constructor(private _crudService: ProductsService) { }
  crudService = this._crudService
  optionsColumns: string[] = ['Eliminar'];

  columns: IListColums[] = [
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
      'name': 'Nombre',
      'code': 'name',
      'show': true,
    },
    {      
      'name': 'Precio Venta',
      'code': 'precio',
      'show': true,
    },
    {      
      'name': 'Precio Compra',
      'code': 'precio_compra',
      'show': true,
    },
    {      
      'name': 'Cuenta Ingresa',
      'code': 'ctaIngresoCodigo',
      'show': true,
    },
    {      
      'name': 'Cuenta Salida',
      'code': 'ctaSalidaCodigo',
      'show': true,
    },


  ]

  modal = FormComponent
}
