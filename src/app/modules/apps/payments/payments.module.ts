import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ListComponent } from './list/list.component';
import { SharedModule } from 'app/shared/shared.module';
import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsFormComponent } from './form/form.component';
import { FuseScrollbarDirective } from '@fuse/directives/scrollbar';
import { PaymentsDetailFormComponent } from './payment_detail_form/payment_detail_form.component';
import { PaymentsSimpleFormComponent } from './payment_simple_form/payment_simple_form.component';
import { PaymentSelectorComponent } from './payment-selector-form/payment-selector-form.component';




@NgModule({
  declarations: [
    ListComponent,
    PaymentsFormComponent,
    PaymentSelectorComponent,
    PaymentsDetailFormComponent,
    PaymentsSimpleFormComponent
  ],
  imports: [
    FuseScrollbarDirective,
    CommonModule,
    SharedModule,
    PaymentsRoutingModule
  ]
})
export class PaymentsModule { }
