import {Component, Input} from '@angular/core';

@Component({
    selector: 'sgm-pagination-count',
    templateUrl: './pagination-count.component.html',
    styleUrls: ['./pagination-count.component.scss']
})
export class PaginationCountComponent {

    @Input() page: number = 0;
    @Input() total: number = 0;
    @Input() itemsPerPage: number = 0;

    constructor() {
    }

    getValue(): any {
        const totalPages = Math.ceil(this.total / this.itemsPerPage);
        return {currentPage: this.page, itemPerPage: totalPages, total: this.total};
    }

}
