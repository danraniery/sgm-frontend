import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {
    API_ACCOUNT_URL,
    DEFAULT_ACTION_NOT_REACHABLE_KEY,
    DEFAULT_SERVER_NOT_REACHABLE_KEY,
    DEFAULT_SERVER_NOT_REACHABLE_MESSAGE
} from '../../app.constants';
import {LoadingService} from '../../shared/components/loading/loading.service';
import {TranslocoService} from '@ngneat/transloco';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(
        private readonly toastService: ToastrService,
        private readonly translate: TranslocoService,
        private readonly loadingService: LoadingService
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(tap(
            () => {
            },
            (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 504 || err.status === 502) {
                        this.handleServerError();
                    } else if (err.status === 0) {
                        this.handleUnknownError();
                    } else if (!(err.status === 401 && (err.message === '' || (err.url && err.url.includes(API_ACCOUNT_URL))))) {
                        this.loadingService.stop();
                    }
                }
            }
        ));
    }

    handleServerError() {
        this.loadingService.stop();
        this.toastService.error(this.translateMessage(DEFAULT_SERVER_NOT_REACHABLE_KEY));
    }

    handleUnknownError() {
        this.loadingService.stop();
        this.toastService.warning(this.translateMessage(DEFAULT_ACTION_NOT_REACHABLE_KEY));
    }

    translateMessage(key: string) {
        const message = this.translate.translate(key);
        if (message !== key) {
            return message;
        } else {
            return DEFAULT_SERVER_NOT_REACHABLE_MESSAGE;
        }
    }

}
