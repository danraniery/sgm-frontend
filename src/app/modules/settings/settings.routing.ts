import {SettingsComponent} from './settings.component';
import {UserRouteAccessService} from '../../core/services/user-route-access-service';
import {Routes} from '@angular/router';
import {permissionRoutes} from './authority/permission.routing';
import {profileRoutes} from './profile/profile.routing';

export const routes: Routes = [
    {
        path: '',
        component: SettingsComponent,
        canActivate: [UserRouteAccessService],
        data: {
            pageTitle: 'permissions.title.list',
            authorities: ['ROLE_PROFILE_MANAGEMENT', 'ROLE_AUDITOR']
        },
    },
    ...profileRoutes,
    ...permissionRoutes
];
