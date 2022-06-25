import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, Subject, throwError} from 'rxjs';
import {catchError, shareReplay, tap} from 'rxjs/operators';
import {API_ACCOUNT_URL, API_CHANGE_PASSWORD_URL, LOGIN_ROUTE, SERVER_API_URL} from '../../app.constants';
import {Account} from '../../shared/models/account.model';
import {AuthServerProvider} from './auth-jwt.service';
import {PasswordModel} from '../../shared/models/password.model';
import {StorageService} from './storage.service';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AccountService {

    private userIdentity: Account = new Account();
    private authenticated = false;
    private readonly authenticationState = new Subject<any>();
    private accountCache$: Observable<Account> | null = null;

    constructor(
        private readonly router: Router,
        private readonly httpClient: HttpClient,
        private readonly storageService: StorageService,
        private readonly authServerProvider: AuthServerProvider
    ) {
    }

    fetch(): Observable<Account> {
        return this.httpClient.get<Account>(SERVER_API_URL + API_ACCOUNT_URL);
    }

    updatePassword(passwordModel: PasswordModel): Observable<Account> {
        return this.httpClient.patch<Account>(API_CHANGE_PASSWORD_URL, passwordModel);
    }

    authenticate(identity: any) {
        this.userIdentity = identity;
        this.authenticated = identity !== null;
        this.authenticationState.next(this.userIdentity);
    }

    hasAnyAuthority(authorities: string[] | string): boolean {
        if (!this.authenticated || !this.userIdentity || !this.userIdentity.authorities) {
            return false;
        }
        if (!Array.isArray(authorities)) {
            authorities = [authorities];
        }

        return authorities.some((authority: string) => this.userIdentity.authorities?.includes(authority));
    }

    identity(force = false): Observable<Account> {
        if (force || !this.authenticated) {
            this.accountCache$ = null;
        }
        if (!this.storageService.getAccessToken()) {
            this.userIdentity = new Account();
            this.authenticated = false;
            return of(this.userIdentity);
        }
        if (!this.accountCache$) {
            this.accountCache$ = this.fetch().pipe(
                catchError((err) => {
                    return throwError(err);
                }),
                tap((account) => {
                    if (account) {
                        this.userIdentity = account;
                        this.authenticated = true;
                    } else {
                        this.userIdentity = new Account();
                        this.authenticated = false;
                    }
                    this.authenticationState.next(this.userIdentity);
                }),
                shareReplay()
            );
        }
        return this.accountCache$;
    }

    isAuthenticated(): boolean {
        return this.authenticated;
    }

    getAuthenticationState(): Observable<any> {
        return this.authenticationState.asObservable();
    }

    isRequiredChangePassword() {
        return this.storageService.getRequiredChangePassword();
    }

    disconnectUser() {
        this.authServerProvider.logout().subscribe(() => {
        }, () => {
        }, () => {
            this.authenticate(null);
            this.router.navigate([LOGIN_ROUTE]).then();
        });
    }

}
