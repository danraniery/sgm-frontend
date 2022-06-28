import {Component, OnDestroy} from '@angular/core';
import {UserList} from '../../../shared/models/user.model';
import {
    ACTIVE_LABEL,
    EDIT,
    INACTIVE_LABEL,
    SERVICE_CREATE_ROUTER,
    SERVICE_LIST_ROUTER,
    VIEW
} from '../../../app.constants';
import {ModalService} from '../../../core/services/modal.service';
import {FeedbackService} from '../../../core/services/feedback.service';
import {SgmServiceService} from '../sgm-service.service';
import {AccountService} from '../../../core/services/account.service';
import {SortService} from '../../../core/services/sort.service';
import {BaseListComponent} from '../../../shared/components/base-list/base-list.component';
import {Subscription} from 'rxjs';
import {LoadingService} from '../../../shared/components/loading/loading.service';
import {Router} from '@angular/router';
import {ISGMService, SGMServiceList} from '../../../shared/models/sgm-service.model';

@Component({
    selector: 'sgm-service',
    templateUrl: './sgm-service.component.html',
    styleUrls: ['./sgm-service.component.scss']
})
export class SgmServiceComponent extends BaseListComponent<SGMServiceList> implements OnDestroy {

    languageSubscriber: Subscription | undefined;
    users: UserList[] = [];
    statusList: any [] = [{value: true, label: ACTIVE_LABEL}, {value: false, label: INACTIVE_LABEL}];

    constructor(
        router: Router,
        sortService: SortService,
        modalService: ModalService,
        accountService: AccountService,
        feedbackService: FeedbackService,
        private readonly sgmServiceService: SgmServiceService,
        private readonly loadingService: LoadingService
    ) {
        super(router, sgmServiceService, sortService, modalService, accountService, feedbackService);
        this.ROLE_WHICH_CAN_EDIT = 'ROLE_SERVICE_MANAGEMENT';
    }

    listOnInit(): void {
        this.accountService.identity().subscribe((account) => {
            this.loggedAccount = account;
        });
        this.sort('name');
    }

    ngOnDestroy(): void {
        if (this.languageSubscriber) {
            this.languageSubscriber.unsubscribe();
        }
    }

    goToNewServiceScreen(): void {
        this.loadingService.start();
        this.router.navigate([SERVICE_CREATE_ROUTER]).then();
    }

    gotToViewScreen(id: any): void {
        this.loadingService.start();
        this.router.navigate([`${SERVICE_LIST_ROUTER}/${id}${VIEW}`]).then();
    }

    gotToEditScreen(id: any): void {
        this.loadingService.start();
        this.router.navigate([`${SERVICE_LIST_ROUTER}/${id}${EDIT}`]).then();
    }

    changeStatus(service: ISGMService) {
        let modalTitle;
        let modalBody;
        let toastMessage;

        modalTitle = service.activated ? 'service.modal.deactivate.title' : 'service.modal.activate.title';
        modalBody = service.activated ? 'service.modal.deactivate.body' : 'service.modal.activate.body';
        toastMessage = service.activated ? 'service.modal.deactivate.message' : 'service.modal.activate.message';

        this.showModalStatusConfirmation(service, modalTitle, modalBody, toastMessage);

    }

    noSearch() {
        return this.status === undefined && this.search.trim().length === 0;
    }

    getParams() {
        let params: any = {
            page: this.page - 1,
            size: this.itemsPerPage,
            search: this.search.trim(),
            sort: this.sortFields
        };
        if (this.status !== undefined) {
            params.status = this.status;
        }
        return params;
    }

    buildEditOrViewRoute(id: number): string {
        const action = this.canEdit ? EDIT : VIEW;
        return `${SERVICE_LIST_ROUTER}/${id}${action}`;
    }

    handleEmptyList(): void {
    }

    onLoadCompleted(): void {
    }

    loadProgressPageInfiniteScroll(): void {
        this.page = this.page + 1;
        if (this.totalItems < this.items.length) {
            this.loadAllWithInfinit();
        }
    }

}
