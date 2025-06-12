import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ListComponent } from './list/list.component';
import { SharedModule } from 'app/shared/shared.module';
import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsFormComponent } from './form/form.component';
import { FuseScrollbarDirective } from '@fuse/directives/scrollbar';



@NgModule({
  declarations: [
    ListComponent,
    PaymentsFormComponent
  ],
  imports: [
    FuseScrollbarDirective,
    CommonModule,
    SharedModule,
    PaymentsRoutingModule
  ]
})
export class PaymentsModule { }
