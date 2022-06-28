import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {routes} from './citizen-service-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgbNavModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../../shared/shared.module';
import {CitizenServiceComponent} from './component/citizen-service.component';

@NgModule({
    declarations: [
        CitizenServiceComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        NgSelectModule,
        NgbNavModule
    ]
})
export class CitizenServiceModule {
}
