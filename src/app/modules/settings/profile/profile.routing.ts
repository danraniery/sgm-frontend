import {ActivatedRouteSnapshot, Resolve, Routes} from '@angular/router';
import {ProfileFormComponent} from './profile-form/profile-form.component';
import {ProfileService} from '../profile.service';
import {Injectable} from '@angular/core';
import {Profile} from '../../../shared/models/profile.model';
import {UserRouteAccessService} from '../../../core/services/user-route-access-service';

@Injectable({providedIn: 'root'})
export class ProfileResolve implements Resolve<any> {

    constructor(private readonly service: ProfileService) {
    }

    resolve(route: ActivatedRouteSnapshot): any {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id);
        }
        return new Profile({});
    }

}

export const profileRoutes: Routes = [
    {
        path: 'profiles',
        canActivate: [UserRouteAccessService],
        data: {
            authorities: ['ROLE_PROFILE_MANAGEMENT', 'ROLE_AUDITOR']
        },
        redirectTo: 'settings'
    },
    {
        path: 'profiles/new',
        component: ProfileFormComponent,
        canActivate: [UserRouteAccessService],
        resolve: {
            profile: ProfileResolve
        },
        data: {
            isViewMode: false,
            label: 'profile.form.label.new',
            authorities: ['ROLE_PROFILE_MANAGEMENT']
        }
    },
    {
        path: 'profiles/:id/edit',
        component: ProfileFormComponent,
        canActivate: [UserRouteAccessService],
        resolve: {
            profile: ProfileResolve
        },
        data: {
            isViewMode: false,
            label: 'profile.form.label.edit',
            authorities: ['ROLE_PROFILE_MANAGEMENT']
        }
    },
    {
        path: 'profiles/:id/view',
        component: ProfileFormComponent,
        canActivate: [UserRouteAccessService],
        resolve: {
            profile: ProfileResolve
        },
        data: {
            isViewMode: true,
            label: 'profile.form.label.view',
            authorities: ['ROLE_PROFILE_MANAGEMENT', 'ROLE_AUDITOR']
        }
    }
];
