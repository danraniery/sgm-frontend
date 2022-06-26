import {ErrorHandler, LOCALE_ID, NgModule} from '@angular/core';
import {DatePipe, registerLocaleData} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {Title} from '@angular/platform-browser';
import locale from '@angular/common/locales/pt';
import {AuthInterceptor} from './interceptor/auth.interceptor';
import {HttpErrorInterceptor} from './interceptor/http-error.interceptor';
import {EncodeHttpParamsInterceptor} from './interceptor/encode.interceptor';
import {GlobalErrorHandler} from './interceptor/error-handler.interceptor';

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'pt-br'
        },
        DatePipe,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: EncodeHttpParamsInterceptor,
            multi: true
        },
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandler
        }
    ]
})
export class CoreModule {

    constructor() {
        registerLocaleData(locale);
    }

}
