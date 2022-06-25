import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'sgm-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

    @Input() page: number = 0;
    @Input() itemsPerPage: number = 0;
    @Input() totalItems: number = 0;
    @Output() pageChange: EventEmitter<any> = new EventEmitter<any>();

    constructor() {
    }

    changePage(page: any) {
        this.pageChange.emit(page);
    }

}
