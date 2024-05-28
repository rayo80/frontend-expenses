import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from 'app/app.component';
import { appConfig } from 'app/app.config';
import { environment } from 'environments/environment';

console.log("no entro")

if (environment.production) {
    console.log("aquisi")
    enableProdMode();
  }
  
bootstrapApplication(AppComponent, appConfig)
    .catch(err => console.error(err));
