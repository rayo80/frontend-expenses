import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliersRoutingModule } from './suppliers-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { FormComponent } from './form/form.component';
import { SupplierListComponent } from './list/list.component';



@NgModule({
  declarations: [
    FormComponent,
    SupplierListComponent,
  ],
  imports: [
    CommonModule,
    SuppliersRoutingModule,
    SharedModule
  ]
})
export class SuppliersModule { }
