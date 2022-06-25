import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DEBOUNCE_TIME} from '../../../app.constants';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
    selector: 'sgm-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    @Output()
    public modelChange: EventEmitter<string> = new EventEmitter();

    @Input()
    public placeholder = 'search.placeholder';

    @Input()
    public customClass: any;

    @Input()
    public withDebounce = true;

    private readonly filterStream: Subject<string> = new Subject();
    public filter: any = null;

    constructor() {
    }

    ngOnInit() {
        if (this.withDebounce) {
            this.filterStream.asObservable().pipe(debounceTime(DEBOUNCE_TIME)).subscribe((filter: string) => {
                this.filter = filter;
                this.modelChange.emit(filter);
            });
        }
    }

    public resetFilter() {
        this.filter = null;
        const inputField: any = document.getElementById('search-input');
        inputField.value = '';
    }

    changeFilter(input: any) {
        const text = input.target.value.trim();
        if (text.length < 2 && text.length > 0) {
            return;
        }
        if (this.withDebounce) {
            this.filterStream.next(text);
        } else {
            this.filter = text;
            this.modelChange.emit(text);
        }
    }

}
