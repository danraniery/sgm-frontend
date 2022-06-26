import {Injectable} from '@angular/core';
import {mergeMap} from 'rxjs/operators';
import {AccountService} from '../../core/services/account.service';
import {AuthServerProvider} from '../../core/services/auth-jwt.service';
import {LOGIN_ROUTE} from '../../app.constants';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class LoginService {

    constructor(
        private readonly router: Router,
        private readonly accountService: AccountService,
        private readonly authServerProvider: AuthServerProvider
    ) {
    }

    login(credentials: any) {
        return this.authServerProvider.login(credentials).pipe(mergeMap(() => this.accountService.identity(true)));
    }

    logout() {
        this.authServerProvider.logout().subscribe(() => {
        }, () => {
        }, () => {
            this.accountService.authenticate(null);
            this.router.navigate([LOGIN_ROUTE]).then();
        });
    }

}
