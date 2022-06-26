import {Component} from '@angular/core';
import {AccountService} from '../../../core/services/account.service';
import {Account, IAccount} from '../../models/account.model';
import {LoginService} from '../../../modules/login/login.service';
import {ModalService} from '../../../core/services/modal.service';
import {Router} from '@angular/router';
import {CHANGE_PASSWORD_ROUTER} from '../../../app.constants';

@Component({
    selector: 'sgm-user-credentials-popover',
    templateUrl: './user-credentials-popover.component.html',
    styleUrls: ['./user-credentials-popover.component.scss']
})
export class UserCredentialsPopoverComponent {

    loggedAccount: IAccount | any;

    constructor(
        private readonly router: Router,
        private readonly loginService: LoginService,
        private readonly modalService: ModalService,
        private readonly accountService: AccountService
    ) {
        this.loggedAccount = new Account();

        this.accountService.identity().subscribe((account: Account) => {
            this.loggedAccount = account;
        });
    }

    changePassword() {
        typeof this.router.navigate([CHANGE_PASSWORD_ROUTER]).then();
    }

    logout() {
        this.loginService.logout();
    }

}
