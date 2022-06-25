import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AccountService} from './account.service';
import {StorageService} from './storage.service';

@Injectable({providedIn: 'root'})
export class UserRouteAccessService implements CanActivate {

    constructor(
        private readonly router: Router,
        private readonly accountService: AccountService,
        private readonly storageService: StorageService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const {authorities} = route.data;
        return this.checkLogin(authorities, state.url);
    }

    checkLogin(authorities: string[], url: string): Observable<boolean> {
        return this.accountService.identity().pipe(map((account) => {
            if (!authorities || authorities.length === 0) {
                return true;
            }
            if (account) {
                const hasAnyAuthority = this.accountService.hasAnyAuthority(authorities);
                if (!hasAnyAuthority) {
                    const redirect = this.storageService.getUrl();
                    if (redirect) {
                        this.storageService.clearUrl();
                        this.router.navigate(redirect).then();
                        return false;
                    }
                }
                this.storageService.storeUrl(url);
                return hasAnyAuthority;
            }
            return false;
        }));
    }

}
