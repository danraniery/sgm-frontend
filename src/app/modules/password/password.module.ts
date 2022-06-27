import {NgModule} from '@angular/core';
import {PasswordComponent} from './component/password.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {PASSWORD_ROUTE} from './password.route';

@NgModule({
    declarations: [
        PasswordComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([PASSWORD_ROUTE])
    ]
})
export class PasswordModule {
}
