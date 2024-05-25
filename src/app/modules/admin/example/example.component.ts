import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from 'app/shared/material/material.module';

@Component({
    selector     : 'example',
    standalone   : true,
    templateUrl  : './example.component.html',
    encapsulation: ViewEncapsulation.None,
    imports        : [MaterialModule],
})
export class ExampleComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
