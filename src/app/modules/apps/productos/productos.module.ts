import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ListComponent } from './list/list.component';
import { SharedModule } from 'app/shared/shared.module';
import { ProductosRoutingModule } from './productos-routing.module';


@NgModule({
  declarations: [
    ListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductosRoutingModule
  ]
})
export class ProductosModule { }
