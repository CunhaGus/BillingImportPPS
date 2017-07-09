import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
/// <reference types="node" />


if (environment.production) {
  enableProdMode();
}

if (process.env.PORT==8080 )
{
console.log('test');

}

platformBrowserDynamic().bootstrapModule(AppModule);
