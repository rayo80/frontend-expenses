import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent } from './list/list.component';
import { SharedModule } from 'app/shared/shared.module';
import { ComprobanteTiposRoutingModule } from './comprobante_tipos-routing.module';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComprobanteTiposRoutingModule
  ]
})
export class ComprobanteTiposModule { }

