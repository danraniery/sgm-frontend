import {Component, OnDestroy} from '@angular/core';
import {IUser, UserList} from '../../../shared/models/user.model';
import {ACTIVE_LABEL, CREATE_USER_ROUTER, EDIT, INACTIVE_LABEL, USER_LIST_ROUTER, VIEW} from '../../../app.constants';
import {ModalService} from '../../../core/services/modal.service';
import {FeedbackService} from '../../../core/services/feedback.service';
import {UserService} from '../user.service';
import {AccountService} from '../../../core/services/account.service';
import {SortService} from '../../../core/services/sort.service';
import {BaseListComponent} from '../../../shared/components/base-list/base-list.component';
import {Subscription} from 'rxjs';
import {LoadingService} from '../../../shared/components/loading/loading.service';
import {Router} from '@angular/router';

@Component({
    selector: 'sgm-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent extends BaseListComponent<UserList> implements OnDestroy {

    languageSubscriber: Subscription | undefined;
    users: UserList[] = [];
    statusList: any [] = [{value: true, label: ACTIVE_LABEL}, {value: false, label: INACTIVE_LABEL}];

    constructor(
        router: Router,
        sortService: SortService,
        modalService: ModalService,
        accountService: AccountService,
        feedbackService: FeedbackService,
        private readonly userService: UserService,
        private readonly loadingService: LoadingService
    ) {
        super(router, userService, sortService, modalService, accountService, feedbackService);
        this.ROLE_WHICH_CAN_EDIT = 'ROLE_USER_MANAGEMENT';
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

    goToNewUserScreen(): void {
        this.loadingService.start();
        this.router.navigate([CREATE_USER_ROUTER]).then();
    }

    gotToViewScreen(id: any): void {
        this.loadingService.start();
        this.router.navigate([`${USER_LIST_ROUTER}/${id}${VIEW}`]).then();
    }

    gotToEditScreen(id: any): void {
        this.loadingService.start();
        this.router.navigate([`${USER_LIST_ROUTER}/${id}${EDIT}`]).then();
    }

    changeStatus(user: IUser) {
        let modalTitle;
        let modalBody;
        let toastMessage;

        if (user.blocked) {
            modalTitle = 'user.modal.unblock.title';
            modalBody = 'user.modal.unblock.body';
            toastMessage = 'user.modal.unblock.message';
        } else {
            modalTitle = user.activated ? 'user.modal.deactivate.title' : 'user.modal.activate.title';
            modalBody = user.activated ? 'user.modal.deactivate.body' : 'user.modal.activate.body';
            toastMessage = user.activated ? 'user.modal.deactivate.message' : 'user.modal.activate.message';
        }

        this.showModalStatusConfirmation(user, modalTitle, modalBody, toastMessage);

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
        return `${USER_LIST_ROUTER}/${id}${action}`;
    }

    handleEmptyList(): void {
    }

    onLoadCompleted(): void {
    }

    loadProgressPageInfiniteScroll(): void {
        this.page = this.page + 1;
        this.loadAll();
    }

}
