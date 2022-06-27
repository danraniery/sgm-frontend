import {Route} from '@angular/router';
import {PasswordComponent} from './component/password.component';

export const PASSWORD_ROUTE: Route = {
    path: 'password',
    component: PasswordComponent,
    data: {
        authorities: [],
        pageTitle: 'login.title'
    }
};
