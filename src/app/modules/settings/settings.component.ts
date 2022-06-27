import {Component} from '@angular/core';

@Component({
    selector: 'sgm-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

    active = 'profiles';

    constructor() {
        console.log('carregou o settings');
    }
}
