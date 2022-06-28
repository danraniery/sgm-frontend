import {NgModule} from '@angular/core';
import {SgmServiceFormComponent} from './component/sgm-srevice-form/sgm-service-form.component';
import {RouterModule} from '@angular/router';
import {routes} from './sgm-service-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgbNavModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../../shared/shared.module';
import {SgmServiceInfoComponent} from './component/sgm-srevice-form/sgm-service-info/sgm-service-info.component';
import {SgmServiceComponent} from './component/sgm-service.component';

@NgModule({
    declarations: [
        SgmServiceComponent,
        SgmServiceInfoComponent,
        SgmServiceFormComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        NgSelectModule,
        NgbNavModule
    ]
})
export class SgmServiceModule {
}
