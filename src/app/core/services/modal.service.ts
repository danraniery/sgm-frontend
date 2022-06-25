import {Injectable} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalActionComponent} from '../../shared/components/modal-action/modal-action.component';
import {ToastrService} from 'ngx-toastr';
import {FeedbackService} from './feedback.service';

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    constructor(
        private readonly modalService: NgbModal,
        private readonly toastService: ToastrService,
        private readonly feedbackService: FeedbackService
    ) {
    }

    showModal(title: any, body: any, component?: any, options?: any, params?: any) {
        const optionsData = options ? options : {centered: true, backdropClass: 'theme-custom-backdrop'};
        const modalRef = this.modalService.open(component ? component : ModalActionComponent, optionsData);
        modalRef.componentInstance.title = title;
        modalRef.componentInstance.body = body;
        modalRef.componentInstance.params = params;
        return modalRef.result;
    }

    openModalAndReturn(modalRef: any, data: any, service: any, toastMessage: string) {
        const isActivated = data.activated;
        const isBlocked = data.blocked;

        return new Promise<boolean>((resolve, reject) => {
            modalRef.then(() => {
                this.feedbackService.initLoading();
                service.delete(data.id).subscribe(() => {

                    if (data.blocked) {
                        data.blocked = false;
                    } else {
                        data.activated = !data.activated;
                    }

                    this.onSuccess(toastMessage);
                    resolve(true);
                }, (err: any) => {
                    data.activated = isActivated;
                    data.blocked = isBlocked;
                    this.feedbackService.closeLoading();
                    reject(err);
                });
            }).catch(() => {
                data.activated = isActivated;
                data.blocked = isBlocked;
                this.feedbackService.closeLoading();
                resolve(false);
            });
        });
    }

    onSuccess(toastMessage: string) {
        this.feedbackService.showSuccess(toastMessage);
        this.feedbackService.closeLoading();
    }
}
