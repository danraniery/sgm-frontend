import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {USER_LIST_ROUTER} from '../../../../app.constants';
import {LoadingService} from '../../../../shared/components/loading/loading.service';

@Component({
    selector: 'sgm-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

    active = 1;
    isViewMode: boolean = false;
    isEditMode: boolean = false;

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly loadingService: LoadingService
    ) {
    }

    ngOnInit(): void {
        this.route.data.subscribe(({user, isViewMode}) => {
            this.loadingService.stop();
            this.isEditMode = user?.id;
            this.isViewMode = isViewMode;
        });
    }

    goToUserListScreen() {
        this.router.navigate([USER_LIST_ROUTER]).then();
    }

    @HostListener('window:beforeunload', ['$event'])
    showMessage(event: any) {
        event.returnValue = 'Confirmation...';
    }

}
