import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SortService {

    constructor() {
    }

    public getOrderStyle(id: string, orderBy: string, asc: boolean) {
        if (orderBy === id) {
            return asc ? 'expand_less' : 'keyboard_arrow_down';
        }
        return 'unfold_more';
    }

    public checkOrderBy(fieldToOrderBy: string, orderBy: string, asc: boolean) {
        return orderBy !== fieldToOrderBy ? true : !asc;
    }

    public sortBy(asc: boolean) {
        return asc ? 'asc' : 'desc';
    }
}
