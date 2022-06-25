import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AccountService} from '../../../core/services/account.service';

@Component({
    selector: 'sgm-toggle-status',
    templateUrl: './toggle-status.component.html',
    styleUrls: ['./toggle-status.component.scss']
})
export class ToggleStatusComponent implements OnInit {

    @Input() activated?: boolean = false;

    @Input() inputToggleId?: number;

    @Input() disabledToggle = false;

    @Input() blocked?: boolean = false;

    @Input() permissions: string[] = [];

    @Output() public toggleAction: EventEmitter<any> = new EventEmitter();

    constructor(private readonly accountService: AccountService) {
    }

    action() {
        this.toggleAction.emit();
    }

    ngOnInit(): void {
        if (!this.disabledToggle && this.permissions.length > 0) {
            this.disabledToggle = !this.accountService.hasAnyAuthority(this.permissions);
        }
    }

}
