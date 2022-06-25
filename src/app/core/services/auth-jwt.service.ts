import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {API_AUTHENTICATE_URL, API_REFRESH_TOKEN_URL, SERVER_API_URL} from '../../app.constants';
import {StorageService} from './storage.service';

@Injectable({providedIn: 'root'})
export class AuthServerProvider {

    constructor(
        private readonly httpClient: HttpClient,
        private readonly storageService: StorageService
    ) {
    }

    login(credentials: any): Observable<any> {
        const authenticateSuccess = (resp: any) => {
            const accessToken = resp.body && resp.body.accessToken ? resp.body.accessToken : '';
            const refreshToken = resp.body && resp.body.refreshToken ? resp.body.refreshToken : '';
            this.storeAuthenticationToken(accessToken, refreshToken);
        };

        return this.httpClient.post(`${SERVER_API_URL}${API_AUTHENTICATE_URL}`, credentials, {observe: 'response'})
            .pipe(map(authenticateSuccess.bind(this)));
    }

    refreshToken() {
        const refreshToken = this.storageService.getRefreshToken();
        return this.httpClient.post<any>(API_REFRESH_TOKEN_URL, {refreshToken});
    }

    storeAuthenticationToken(accessToken: string, refreshToken: string) {
        this.storageService.storeAccessToken(accessToken);
        this.storageService.storeRefreshToken(refreshToken);
    }

    logout(): Observable<any> {
        return new Observable((observer) => {
            this.storageService.clearAccessToken();
            this.storageService.clearRefreshToken();
            this.storageService.clearUrl();
            observer.complete();
        });
    }

}
