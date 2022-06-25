import {Injectable} from '@angular/core';
import {SessionStorageService} from 'ngx-webstorage';
import {ACCESS_TOKEN, PREVIOUS_URL_SESSION_TOKEN, REFRESH_TOKEN, REQUIRED_CHANGE_PASSWORD} from '../../app.constants';

@Injectable({providedIn: 'root'})
export class StorageService {

    constructor(private readonly sessionStorage: SessionStorageService) {
    }

    storeUrl(url: string) {
        this.sessionStorage.store(PREVIOUS_URL_SESSION_TOKEN, url);
    }

    getUrl() {
        return this.sessionStorage.retrieve(PREVIOUS_URL_SESSION_TOKEN);
    }

    clearUrl() {
        this.sessionStorage.clear(PREVIOUS_URL_SESSION_TOKEN);
    }

    storeAccessToken(token: string) {
        this.sessionStorage.store(ACCESS_TOKEN, token);
    }

    getAccessToken() {
        return this.sessionStorage.retrieve(ACCESS_TOKEN);
    }

    clearAccessToken() {
        this.sessionStorage.clear(ACCESS_TOKEN);
    }

    storeRefreshToken(token: string) {
        this.sessionStorage.store(REFRESH_TOKEN, token);
    }

    getRefreshToken() {
        return this.sessionStorage.retrieve(REFRESH_TOKEN);
    }

    clearRefreshToken() {
        this.sessionStorage.clear(REFRESH_TOKEN);
    }

    storeRequiredChangePassword(requiredChangePassword: boolean) {
        this.sessionStorage.store(REQUIRED_CHANGE_PASSWORD, requiredChangePassword);
    }

    getRequiredChangePassword() {
        return this.sessionStorage.retrieve(REQUIRED_CHANGE_PASSWORD);
    }

    clearRequiredChangePassword() {
        this.sessionStorage.clear(REQUIRED_CHANGE_PASSWORD);
    }

}
