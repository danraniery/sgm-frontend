import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {MainComponent} from './core/components/main/main.component';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule} from 'ngx-toastr';
import {TOAST_TIME_OUT} from './app.constants';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslocoRootModule} from './transloco-root.module';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {NgSelectModule} from '@ng-select/ng-select';
import {SidenavComponent} from './core/components/sidenav/sidenav.component';

@NgModule({
    declarations: [
        MainComponent,
        SidenavComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule,
        SharedModule,
        HttpClientModule,
        NgbModule,
        NgxWebstorageModule.forRoot({prefix: 'sgm', separator: '-', caseSensitive: true}),
        HttpClientModule,
        ToastrModule.forRoot({
            timeOut: TOAST_TIME_OUT,
            positionClass: 'toast-bottom-right',
            preventDuplicates: true
        }),
        BrowserAnimationsModule,
        TranslocoRootModule,
        NgSelectModule
    ],
    providers: [],
    bootstrap: [MainComponent]
})
export class AppModule {
}
