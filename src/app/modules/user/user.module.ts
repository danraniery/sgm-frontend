import {NgModule} from '@angular/core';
import {UserFormComponent} from './component/user-form/user-form.component';
import {RouterModule} from '@angular/router';
import {routes} from './user-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgbNavModule} from '@ng-bootstrap/ng-bootstrap';
import {UserComponent} from './component/user.component';
import {SharedModule} from '../../shared/shared.module';
import {UserInfoComponent} from './component/user-form/user-info/user-info.component';

@NgModule({
    declarations: [
        UserComponent,
        UserFormComponent,
        UserInfoComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        NgSelectModule,
        NgbNavModule
    ]
})
export class UserModule {
}
