import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ListComponent } from './list/list.component';
import { SharedModule } from 'app/shared/shared.module';
import { ProductosRoutingModule } from './productos-routing.module';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [
    ListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductosRoutingModule
  ]
})
export class ProductosModule { }
