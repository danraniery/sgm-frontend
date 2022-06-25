import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {TranslocoService} from '@ngneat/transloco';
import {LoadingService} from '../../shared/components/loading/loading.service';
import {TOAST_TIME_OUT} from '../../app.constants';

@Injectable({providedIn: 'root'})
export class FeedbackService {

    constructor(
        private readonly translate: TranslocoService,
        private readonly toastService: ToastrService,
        private readonly loadingService: LoadingService
    ) {
    }

    showErrorFromServer(err: any) {
        if (err.error && err.error.detail) {
            this.toastService.error(err.error.detail);
        }
    }

    showError(key: string, params?: any) {
        this.toastService.error(this.translate.translate(key, params));
    }

    showSuccess(key: string) {
        this.toastService.success(this.translate.translate(key));
    }

    showWarning(key: string) {
        this.toastService.warning(this.translate.translate(key));
    }

    showInfo(key: string, timeOut?: number) {
        this.toastService.info(this.translate.translate(key), '', {
            timeOut: timeOut || TOAST_TIME_OUT,
        });
    }

    initLoading() {
        this.loadingService.start();
    }

    closeLoading() {
        this.loadingService.stop();
    }

    translateFromKey(key: string) {
        return this.translate.translate(key);
    }

}
