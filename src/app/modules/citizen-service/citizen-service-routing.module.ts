import {Routes} from '@angular/router';
import {CitizenServiceComponent} from './component/citizen-service.component';
import {UserRouteAccessService} from '../../core/services/user-route-access-service';

export const routes: Routes = [
    {
        path: '',
        component: CitizenServiceComponent,
        canActivate: [UserRouteAccessService],
        data: {
            authorities: ['ROLE_VIEW_CITIZEN_SERVICES', 'ROLE_AUDITOR']
        }
    }
];
