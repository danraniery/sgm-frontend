import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../profile.service';
import {IAuthority} from '../../../../shared/models/authority.model';
import {LOADING_TIME} from '../../../../app.constants';

@Component({
    selector: 'sgm-authority-list',
    templateUrl: './permission.component.html',
    styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {
    authorities: IAuthority [] = [];
    isLoading: boolean = true;
    loadingTimeout: any;

    constructor(private readonly profileService: ProfileService) {
    }

    ngOnInit(): void {
        this.loadAll();
    }

    private loadAll() {
        this.showLoad();
        this.profileService.getAllAuthorities().subscribe((value: IAuthority[]) => {
            this.authorities = value;
            this.closeLoad();
        });
    }

    private showLoad() {
        this.loadingTimeout = setTimeout(() => {
            this.isLoading = true;
        }, LOADING_TIME);
    }

    private closeLoad() {
        this.isLoading = false;
        clearTimeout(this.loadingTimeout);
    }
}
