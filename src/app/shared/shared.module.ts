import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CrudLayoutComponent } from './components/crud-layout/crud-layout.component';

import { ListBaseComponent } from './components/list-base/list-base.component';
import { MaterialModule } from './material/material.module';


@NgModule({
    declarations: [
        CrudLayoutComponent,
        ListBaseComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
    ],
    exports: [
        ListBaseComponent,
        CrudLayoutComponent,

        MaterialModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        
    ]
})
export class SharedModule
{
}
