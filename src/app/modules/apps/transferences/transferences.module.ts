import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ListComponent } from './list/list.component';
import { SharedModule } from 'app/shared/shared.module';

import { FuseScrollbarDirective } from '@fuse/directives/scrollbar';
import { transferencesRoutingModule } from './transferences-routing.module';



@NgModule({
  declarations: [
    ListComponent,
  ],
  imports: [
    FuseScrollbarDirective,
    CommonModule,
    SharedModule,
    transferencesRoutingModule
  ]
})
export class TransferencesModule { }