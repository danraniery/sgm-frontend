import {ErrorHandler, Injectable, Injector, NgZone} from '@angular/core';
import {
    CHUNK_LOAD_ERROR,
    DEFAULT_ACTION_NOT_REACHABLE_KEY,
    DEFAULT_SERVER_NOT_REACHABLE_MESSAGE
} from '../../app.constants';
import {TranslocoService} from '@ngneat/transloco';
import {FeedbackService} from '../services/feedback.service';

@Injectable({providedIn: 'root'})
export class GlobalErrorHandler implements ErrorHandler {

    constructor(
        private readonly injector: Injector,
        private readonly translate: TranslocoService,
        private readonly zone: NgZone
    ) {
    }

    handleError(error: any) {
        const feedbackService = this.injector.get(FeedbackService);
        if (error.message.includes(DEFAULT_ACTION_NOT_REACHABLE_KEY) || error.message.includes(CHUNK_LOAD_ERROR)) {
            this.zone.run(() => {
                const message = this.translate.translate(DEFAULT_ACTION_NOT_REACHABLE_KEY);
                if (message !== DEFAULT_ACTION_NOT_REACHABLE_KEY) {
                    feedbackService.showWarning(DEFAULT_ACTION_NOT_REACHABLE_KEY);
                } else {
                    feedbackService.showWarning(DEFAULT_SERVER_NOT_REACHABLE_MESSAGE);
                }
                feedbackService.closeLoading();
            });
        }
    }

}
