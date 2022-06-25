import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {LOADING_TIME} from '../../../app.constants';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    private readonly isSaving = new BehaviorSubject<boolean>(false);
    isSavingCast = this.isSaving.asObservable();

    private readonly message = new BehaviorSubject<string>('');
    messageCast = this.message.asObservable();

    loadingTimeout: any;

    constructor() {
    }

    start() {
        this.loadingTimeout = setTimeout(() => {
            this.isSaving.next(true);
        }, LOADING_TIME);
    }

    stop() {
        this.isSaving.next(false);
        clearTimeout(this.loadingTimeout);
    }

    setMessage(value: string) {
        this.message.next(value);
    }

}
