import {Component} from '@angular/core';
import {ProfileService} from '../../profile.service';
import {IProfile} from '../../../../shared/models/profile.model';
import {ACTIVE_LABEL, EDIT, INACTIVE_LABEL, NEW, SETTINGS_PROFILE, VIEW} from '../../../../app.constants';
import {ModalService} from '../../../../core/services/modal.service';
import {FeedbackService} from '../../../../core/services/feedback.service';
import {SortService} from '../../../../core/services/sort.service';
import {BaseListComponent} from '../../../../shared/components/base-list/base-list.component';
import {LoadingService} from '../../../../shared/components/loading/loading.service';
import {AccountService} from '../../../../core/services/account.service';
import {Router} from '@angular/router';

@Component({
    selector: 'sgm-profile-list',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends BaseListComponent<IProfile> {

    profiles: IProfile [] = [];
    statusList: any [] = [{value: true, label: ACTIVE_LABEL}, {value: false, label: INACTIVE_LABEL}];

    constructor(
        router: Router,
        sortService: SortService,
        modalService: ModalService,
        profileService: ProfileService,
        accountService: AccountService,
        feedbackService: FeedbackService,
        private readonly loadingService: LoadingService
    ) {
        super(router, profileService, sortService, modalService, accountService, feedbackService);
        this.ROLE_WHICH_CAN_EDIT = 'ROLE_PROFILE_MANAGEMENT';
    }

    listOnInit(): void {
        this.sortByFieldAndLoadAll('name');
    }

    goToNewProfileScreen(): void {
        this.loadingService.start();
        this.router.navigate([`${SETTINGS_PROFILE}${NEW}`]).then();
    }

    gotToViewScreen(id: number): void {
        this.loadingService.start();
        this.router.navigate([`${SETTINGS_PROFILE}${id}${VIEW}`]).then();
    }

    gotToEditScreen(id: number): void {
        this.loadingService.start();
        this.router.navigate([`${SETTINGS_PROFILE}${id}${EDIT}`]).then();
    }

    changeStatus(profile: IProfile) {
        const modalTitle = profile.activated ? 'profile.modal.deactivate.title' : 'profile.modal.activate.title';
        const modalBody = profile.activated ? 'profile.modal.deactivate.body' : 'profile.modal.activate.body';
        const toastMessage = profile.activated ? 'profile.modal.deactivate.message' : 'profile.modal.activate.message';

        this.showModalStatusConfirmation(profile, modalTitle, modalBody, toastMessage);
    }

    noSearch() {
        return this.status === undefined && this.search.trim().length === 0;
    }

    sortByFieldAndLoadAll(orderBy: any): void {
        this.asc = this.sortService.checkOrderBy(orderBy, this.orderBy, this.asc);
        this.orderBy = orderBy;
        this.sortFields = [`${orderBy},${this.sortService.sortBy(this.asc)}`];
        this.loadAll();
    }

    override getSortIcon(id: string): string {
        this.sortIcon = this.sortService.getOrderStyle(id, this.orderBy, this.asc);
        return this.sortIcon;
    }

    getParams(): any {
        let params: any = {
            page: this.page - 1,
            size: this.itemsPerPage,
            name: this.search.trim(),
            sort: this.sortFields
        };
        if (this.status !== undefined) {
            params.status = this.status;
        }
        return params;
    }

    handleEmptyList(): void {
        super.feedbackService.showInfo(this.noSearch() ? 'message.noItems' : 'message.noResults');
    }

    removeEmptySpace(profile: IProfile): string {
        if (profile && profile.name) {
            return profile.name.replace(' ', '');
        }
        return '';
    }

    onLoadCompleted(): void {
    }

    buildEditOrViewRoute(profile: IProfile): string {
        const action = this.canEdit && !profile.onlyRead ? EDIT : VIEW;
        return `${SETTINGS_PROFILE}${profile.id}${action}`;
    }

    loadProgressPageInfiniteScroll(): void {
        this.page = this.page + 1;
        if (this.totalItems < this.items.length) {
            this.loadAllWithInfinit();
        }
    }

}