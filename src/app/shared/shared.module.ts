import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ToggleStatusComponent} from './components/toggle-status/toggle-status.component';
import {HasAuthorityDirective} from './directives/has-authority.directive';
import {SharedLibsModule} from './shared-libs.module';
import {PaginationComponent} from './components/pagination/pagination.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {PaginationCountComponent} from './components/pagination/pagination-count/pagination-count.component';
import {SearchComponent} from './components/search/search.component';
import {TranslocoRootModule} from '../transloco-root.module';
import {ModalActionComponent} from './components/modal-action/modal-action.component';
import {LoadingComponent} from './components/loading/loading.component';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
    imports: [
        SharedLibsModule,
        CommonModule,
        NgbPaginationModule,
        TranslocoRootModule,
        NgSelectModule
    ],
    declarations: [
        ToggleStatusComponent,
        PaginationComponent,
        HasAuthorityDirective,
        PaginationCountComponent,
        SearchComponent,
        ModalActionComponent,
        LoadingComponent,
    ],
    exports: [
        SharedLibsModule,
        ToggleStatusComponent,
        HasAuthorityDirective,
        PaginationComponent,
        PaginationCountComponent,
        SearchComponent,
        TranslocoRootModule,
        ModalActionComponent,
        LoadingComponent
    ]
})
export class SharedModule {
}
