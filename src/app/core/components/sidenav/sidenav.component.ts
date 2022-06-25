import {Component} from '@angular/core';

@Component({
    selector: 'sgm-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

    opened: boolean = false;

    constructor() {
    }

}
