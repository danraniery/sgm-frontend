import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'sgm-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

    opened: boolean = false;

    constructor(private readonly router: Router) {
    }

    openMenu() {
        this.opened = !this.opened;
    }

    navigate(url: string) {
        this.router.navigate([url]).then();
    }

}
