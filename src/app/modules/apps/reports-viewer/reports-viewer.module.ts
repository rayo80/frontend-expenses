import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReportViewerComponent } from './reports-viewer.component';
import { PurchasesRoutingModule } from '../purchases/purchases-routing.module';
import { ReportsViewerRoutingModule } from './reports-viewer-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { FiltrosReporteE1 } from './report-E1/report-E1.component';


@NgModule({
  declarations: [
    ReportViewerComponent,
    FiltrosReporteE1
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReportsViewerRoutingModule
  ],
  exports: [
    ReportViewerComponent
  ]
})
export class ReportViewerModule { }