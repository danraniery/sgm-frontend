import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'sgm-modal-action',
    templateUrl: './modal-action.component.html',
    styleUrls: ['./modal-action.component.scss']
})
export class ModalActionComponent {

    title: string = '';
    body: string = '';
    params: any;

    constructor(private readonly activeModal: NgbActiveModal) {
    }

    confirm() {
        this.activeModal.close('confirm');
    }

    cancel() {
        this.activeModal.dismiss('cancel');
    }

}
