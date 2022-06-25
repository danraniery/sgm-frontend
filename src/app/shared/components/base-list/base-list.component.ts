import {Component, OnInit} from '@angular/core';
import {INITIAL_PAGE, ITEMS_PER_PAGE, LOADING_TIME} from '../../../app.constants';
import {IService} from '../../services/i-service.service';
import {IAccount} from '../../models/account.model';
import {Router} from '@angular/router';
import {SortService} from '../../../core/services/sort.service';
import {ModalService} from '../../../core/services/modal.service';
import {AccountService} from '../../../core/services/account.service';
import {FeedbackService} from '../../../core/services/feedback.service';

@Component({template: ''})
export abstract class BaseListComponent<T> implements OnInit {

    items: Array<T> = [];
    totalItems: number = 0;
    page: number = INITIAL_PAGE;
    subLevelpage: number = INITIAL_PAGE;

    itemsPerPage: number = ITEMS_PER_PAGE;
    asc = false;
    sortFields: string [] = [];
    orderBy: any;
    sortIcon: string = '';

    search: string = '';
    status?: boolean;
    isLoading: boolean = true;
    loadingTimeout: any;
    loggedAccount: IAccount | any;

    ROLE_WHICH_CAN_EDIT: string | string[] = '';

    protected constructor(
        public readonly router: Router,
        public readonly service: IService<T>,
        public readonly sortService: SortService,
        private readonly modalService: ModalService,
        public readonly accountService: AccountService,
        public readonly feedbackService: FeedbackService
    ) {
    }

    ngOnInit() {
        this.listOnInit();
    }

    abstract listOnInit(): void;

    abstract handleEmptyList(): void;

    abstract onLoadCompleted(): void;

    abstract getParams(): any;

    abstract noSearch(): any;

    loadAll(): void {
        this.showLoad();
        this.service.query(this.getParams()).subscribe((value: any) => {
            this.items = value.body.content;
            this.totalItems = value.body.totalElements;
            this.closeLoad();
            this.onLoadCompleted();
            if (!this.totalItems) {
                this.handleEmptyList();
            }
        }, (error) => {
            this.feedbackService.showErrorFromServer(error);
            this.closeLoad();
        });
    };

    showModalStatusConfirmation(model: T, modalTitle: string, modalBody: string, toastMessage: string) {
        const modalRef = this.modalService.showModal(modalTitle, modalBody);
        this.modalService.openModalAndReturn(modalRef, model, this.service, toastMessage).then((confirmed) => {
            if (confirmed) {
                this.loadAll();
            }
        }).catch((err: any) => {
            this.feedbackService.showErrorFromServer(err);
        });
    }

    setSearch(search: string) {
        this.search = search;
        this.page = INITIAL_PAGE;
        this.loadAll();
    }

    loadItemsPage(page: number): void {
        this.page = page;
        this.loadAll();
    }

    sort(orderBy: any): void {
        this.asc = this.sortService.checkOrderBy(orderBy, this.orderBy, this.asc);
        this.orderBy = orderBy;
        this.sortFields = [`${orderBy},${this.sortService.sortBy(this.asc)}`];
        this.loadAll();
    }

    getSortIcon(id: string): string {
        this.sortIcon = this.sortService.getOrderStyle(id, this.orderBy, this.asc);
        return this.sortIcon;
    }

    setStatus(status?: any): void {
        this.status = status?.value;
        this.page = INITIAL_PAGE;
        this.loadAll();
    }

    showLoad() {
        this.loadingTimeout = setTimeout(() => {
            this.isLoading = true;
        }, LOADING_TIME);
    }

    closeLoad() {
        this.isLoading = false;
        clearTimeout(this.loadingTimeout);
    }

    redirectByUrl(url: string) {
        this.router.navigate([url]).then();
    }

    get canEdit() {
        return this.accountService.hasAnyAuthority(this.ROLE_WHICH_CAN_EDIT);
    }

}
