import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchasesRoutingModule } from './purchases-routing.module';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'app/shared/shared.module';
import { PurchasesFormComponent } from './form/form.component';


@NgModule({
  declarations: [
    ListComponent,
    PurchasesFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PurchasesRoutingModule
  ]
})
export class PurchasesModule { }
