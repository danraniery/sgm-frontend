import {Component} from '@angular/core';
import {LoadingService} from './loading.service';

@Component({
    selector: 'sgm-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

    isSaving = false;
    message = '';

    constructor(private readonly loadingService: LoadingService) {
        this.loadingService.isSavingCast.subscribe((result: any) => {
            this.isSaving = result;
        });

        this.loadingService.messageCast.subscribe((result: any) => {
            this.message = result;
        });
    }

}
