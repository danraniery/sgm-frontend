import {ActivatedRouteSnapshot, Resolve, Routes} from '@angular/router';
import {UserComponent} from './component/user.component';
import {UserFormComponent} from './component/user-form/user-form.component';
import {Injectable} from '@angular/core';
import {User} from '../../shared/models/user.model';
import {UserService} from './user.service';
import {UserRouteAccessService} from '../../core/services/user-route-access-service';

@Injectable({providedIn: 'root'})
export class UserManagementResolve implements Resolve<any> {

    constructor(private readonly service: UserService) {
    }

    resolve(route: ActivatedRouteSnapshot): any {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id);
        }
        return new User();
    }

}

export const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        canActivate: [UserRouteAccessService],
        data: {
            authorities: ['ROLE_USER_MANAGEMENT', 'ROLE_AUDITOR']
        }
    },
    {
        path: 'new',
        component: UserFormComponent,
        canActivate: [UserRouteAccessService],
        resolve: {
            user: UserManagementResolve
        },
        data: {
            isViewMode: false,
            label: 'user.form.label.new',
            authorities: ['ROLE_USER_MANAGEMENT']
        }
    },
    {
        path: ':id/edit',
        component: UserFormComponent,
        canActivate: [UserRouteAccessService],
        resolve: {
            user: UserManagementResolve
        },
        data: {
            isViewMode: false,
            label: 'user.form.label.edit',
            authorities: ['ROLE_USER_MANAGEMENT', 'ROLE_AUDITOR']
        }
    },
    {
        path: ':id/view',
        component: UserFormComponent,
        canActivate: [UserRouteAccessService],
        resolve: {
            user: UserManagementResolve
        },
        data: {
            isViewMode: true,
            label: 'user.form.label.view',
            authorities: ['ROLE_USER_MANAGEMENT', 'ROLE_AUDITOR']
        }
    }
];
