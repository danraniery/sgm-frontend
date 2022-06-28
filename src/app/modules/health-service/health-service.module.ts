import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {routes} from './health-service-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgbNavModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../../shared/shared.module';
import {HealthServiceComponent} from './component/health-service.component';

@NgModule({
    declarations: [
        HealthServiceComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        NgSelectModule,
        NgbNavModule
    ]
})
export class HealthServiceModule {
}
