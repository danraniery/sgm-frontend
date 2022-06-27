import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Account} from '../../../shared/models/account.model';
import {AccountService} from '../../services/account.service';
import {StorageService} from '../../services/storage.service';
import {CHANGE_PASSWORD_ROUTER, LOGIN_ROUTE} from '../../../app.constants';
import {TranslocoService} from '@ngneat/transloco';

@Component({
    selector: 'sgm-main-component',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    loggedAccount: Account | undefined;
    updatePassword: boolean = false;

    constructor(
        private readonly router: Router,
        private readonly translate: TranslocoService,
        private readonly accountService: AccountService,
        private readonly storageService: StorageService
    ) {
    }

    ngOnInit() {
        this.translate.setActiveLang('pt-br');
        this.updatePassword = this.storageService.getRequiredChangePassword();

        this.accountService.identity().subscribe((account) => {
            this.loggedAccount = account;
        });

        if (!this.isAuthenticated() && !this.updatePassword && this.storageService.getAccessToken()) {
            this.accountService.fetch().subscribe((account) => {
                this.accountService.authenticate(account);
            });
        } else if (this.updatePassword) {
            this.router.navigate([CHANGE_PASSWORD_ROUTER]).then();
        } else {
            this.router.navigate([LOGIN_ROUTE]).then();
        }

    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    isToShowBar() {
        return this.accountService.isAuthenticated() && !this.isUpdatePassword();
    }

    isUpdatePassword() {
        return this.storageService.getRequiredChangePassword();
    }

    isFullPage() {
        return this.router.url.includes(LOGIN_ROUTE) || this.router.url.includes(CHANGE_PASSWORD_ROUTER);
    }

}
