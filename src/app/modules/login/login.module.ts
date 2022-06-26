import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LOGIN_ROUTE} from './login.route';
import {LoginComponent} from './component/login.component';
import {SharedModule} from '../../shared/shared.module';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(LOGIN_ROUTE),
        NgSelectModule
    ],
    declarations: [LoginComponent],
    exports: [LoginComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginModule {
}
