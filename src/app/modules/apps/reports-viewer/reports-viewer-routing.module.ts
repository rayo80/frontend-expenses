import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportViewerComponent } from './reports-viewer.component';


const routes: Routes = [
  {
    path: "",
    component: ReportViewerComponent,

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsViewerRoutingModule { }
