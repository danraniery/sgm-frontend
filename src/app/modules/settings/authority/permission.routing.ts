import {UserRouteAccessService} from '../../../core/services/user-route-access-service';
import {Routes} from '@angular/router';

export const permissionRoutes: Routes = [
    {
        path: 'permissions',
        canActivate: [UserRouteAccessService],
        data: {
            pageTitle: 'permissions.title.list',
            authorities: ['ROLE_PROFILE_MANAGEMENT', 'ROLE_AUDITOR']
        },
        redirectTo: 'settings'
    },
];
