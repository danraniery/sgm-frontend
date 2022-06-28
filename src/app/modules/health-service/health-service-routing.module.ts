import {Routes} from '@angular/router';
import {HealthServiceComponent} from './component/health-service.component';
import {UserRouteAccessService} from '../../core/services/user-route-access-service';

export const routes: Routes = [
    {
        path: '',
        component: HealthServiceComponent,
        canActivate: [UserRouteAccessService],
        data: {
            authorities: ['ROLE_VIEW_HEALTH_SERVICES', 'ROLE_AUDITOR']
        }
    }
];
