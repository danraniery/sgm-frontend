import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HOME_ROUTE} from './home.route';
import {HomeComponent} from './component/home.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([HOME_ROUTE])
    ],
    declarations: [HomeComponent],
    exports: [HomeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule {
}
