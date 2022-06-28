import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SERVICE_LIST_ROUTER} from '../../../../app.constants';
import {LoadingService} from '../../../../shared/components/loading/loading.service';

@Component({
    selector: 'sgm-service-form',
    templateUrl: './sgm-service-form.component.html',
    styleUrls: ['./sgm-service-form.component.scss']
})
export class SgmServiceFormComponent implements OnInit {

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
        this.router.navigate([SERVICE_LIST_ROUTER]).then();
    }

    @HostListener('window:beforeunload', ['$event'])
    showMessage(event: any) {
        event.returnValue = 'Confirmation...';
    }

}
