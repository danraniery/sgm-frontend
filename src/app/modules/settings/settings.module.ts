import {NgModule} from '@angular/core';
import {SettingsComponent} from './settings.component';
import {NgbButtonsModule, NgbNavModule, NgbToastModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {routes} from './settings.routing';
import {ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {SharedModule} from '../../shared/shared.module';
import {PermissionComponent} from './authority/authority-list/permission.component';
import {ProfileComponent} from './profile/profile/profile.component';
import {ProfileFormComponent} from './profile/profile-form/profile-form.component';

@NgModule({
    declarations: [
        SettingsComponent,
        ProfileComponent,
        ProfileFormComponent,
        PermissionComponent
    ],
    imports: [
        NgbNavModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        NgSelectModule,
        NgbButtonsModule,
        NgbToastModule,
        SharedModule
    ],
    providers: [
        NgbToastModule
    ]
})
export class SettingsModule {
}
