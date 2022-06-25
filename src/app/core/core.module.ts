import {LOCALE_ID, NgModule} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {Title} from '@angular/platform-browser';
import locale from '@angular/common/locales/pt';

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'pt-br'
        }
    ]
})
export class CoreModule {

    constructor() {
        registerLocaleData(locale);
    }

}
