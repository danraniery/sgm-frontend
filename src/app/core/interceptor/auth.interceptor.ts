import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BEARER, SERVER_API_URL} from '../../app.constants';
import {StorageService} from '../services/storage.service';
import {catchError, switchMap} from 'rxjs/operators';
import {AuthServerProvider} from '../services/auth-jwt.service';
import {FeedbackService} from '../services/feedback.service';
import {LoginService} from '../../modules/login/login.service';

@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private readonly loginService: LoginService,
        private readonly storageService: StorageService,
        private readonly feedbackService: FeedbackService,
        private readonly authServerProvider: AuthServerProvider
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!request || !request.url || (request.url.startsWith('http') && !(SERVER_API_URL && request.url.startsWith(SERVER_API_URL)))) {
            return next.handle(request);
        }

        const accessToken = this.storageService.getAccessToken();

        request = this.cloneRequest(request, accessToken);

        return next.handle(request).pipe(catchError((error: any) => {
            if (error.status === 403 && this.storageService.getRefreshToken()) {
                return this.refreshToken(request, next);
            }
            if (error.status === 401) {
                this.handleUnauthorized(error);
            }
            return throwError(error);
        }));
    }

    private cloneRequest(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                Authorization: token ? BEARER + token : ''
            }
        });
    }

    private refreshToken(request: HttpRequest<any>, next: HttpHandler) {
        return this.authServerProvider.refreshToken().pipe(switchMap((response) => {
            this.storageService.storeAccessToken(response.accessToken);
            this.storageService.storeRefreshToken(response.refreshToken);
            return next.handle(this.cloneRequest(request, response.accessToken));
        }), catchError((error) => {
            this.handleUnauthorized(error);
            return throwError(error);
        }));
    }

    private handleUnauthorized(error: any) {
        this.feedbackService.showErrorFromServer(error);

        let {hash} = window.location;
        if (hash && hash.startsWith('#')) {
            hash = hash.substr(1, hash.length);
        }

        this.storageService.storeUrl(hash);
        this.loginService.logout();
    }

}
