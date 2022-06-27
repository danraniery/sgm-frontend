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
import {
    UserCredentialsPopoverComponent
} from './components/user-credentials-popover/user-credentials-popover.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

@NgModule({
    imports: [
        SharedLibsModule,
        CommonModule,
        NgbPaginationModule,
        TranslocoRootModule,
        NgSelectModule,
        InfiniteScrollModule
    ],
    declarations: [
        ToggleStatusComponent,
        PaginationComponent,
        HasAuthorityDirective,
        PaginationCountComponent,
        SearchComponent,
        ModalActionComponent,
        LoadingComponent,
        UserCredentialsPopoverComponent
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
        LoadingComponent,
        UserCredentialsPopoverComponent,
        InfiniteScrollModule
    ]
})
export class SharedModule {
}
