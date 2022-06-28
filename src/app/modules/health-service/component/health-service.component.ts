import {Component} from '@angular/core';
import {EDIT, SERVICE_LIST_ROUTER, VIEW} from '../../../app.constants';
import {ModalService} from '../../../core/services/modal.service';
import {FeedbackService} from '../../../core/services/feedback.service';
import {HealthServiceService} from '../health-service.service';
import {AccountService} from '../../../core/services/account.service';
import {SortService} from '../../../core/services/sort.service';
import {BaseListComponent} from '../../../shared/components/base-list/base-list.component';
import {Router} from '@angular/router';
import {SGMServiceCard} from '../../../shared/models/sgm-service.model';

@Component({
    selector: 'sgm-health-service',
    templateUrl: './health-service.component.html',
    styleUrls: ['./health-service.component.scss']
})
export class HealthServiceComponent extends BaseListComponent<SGMServiceCard> {

    constructor(
        router: Router,
        sortService: SortService,
        modalService: ModalService,
        accountService: AccountService,
        feedbackService: FeedbackService,
        private readonly sgmServiceService: HealthServiceService
    ) {
        super(router, sgmServiceService, sortService, modalService, accountService, feedbackService);
        this.ROLE_WHICH_CAN_EDIT = 'ROLE_VIEW_HEALTH_SERVICES';
    }

    listOnInit(): void {
        const orderBy = 'name';
        this.asc = this.sortService.checkOrderBy(orderBy, this.orderBy, this.asc);
        this.orderBy = orderBy;
        this.sortFields = [`${orderBy},${this.sortService.sortBy(this.asc)}`];
        this.loadAllActivatedWithInfinit();
    }


    navigate(path: string, localPath: boolean): void {
        if (localPath) {
            this.router.navigate([path]).then();
        } else {
            window.open(path, '_blank');
            window.focus();
        }
    }

    getParams() {
        let params: any = {
            page: this.page - 1,
            size: this.itemsPerPage,
            search: this.search.trim(),
            sort: this.sortFields,
            id: '2'
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

    noSearch() {
    }

    handleEmptyList(): void {
    }

    onLoadCompleted(): void {
    }

    loadProgressPageInfiniteScroll(): void {
        this.page = this.page + 1;
        if (this.totalItems < this.items.length) {
            this.loadAllActivatedWithInfinit();
        }
    }

    loadAllActivatedWithInfinit(): void {
        this.showLoad();
        this.service.getAll(this.getParams()).subscribe((value: any) => {
            this.items = [...this.items, ...value.body.content];
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
    }

}
