import {Routes} from '@angular/router';
import {LoginComponent} from './component/login.component';

export const LOGIN_ROUTE: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        data: {
            authorities: [],
            pageTitle: 'login.title'
        }
    }
];
