import {ActivatedRouteSnapshot, Resolve, Routes} from '@angular/router';
import {SgmServiceComponent} from './component/sgm-service.component';
import {SgmServiceFormComponent} from './component/sgm-srevice-form/sgm-service-form.component';
import {Injectable} from '@angular/core';
import {SgmServiceService} from './sgm-service.service';
import {UserRouteAccessService} from '../../core/services/user-route-access-service';
import {SGMService} from '../../shared/models/sgm-service.model';

@Injectable({providedIn: 'root'})
export class UserManagementResolve implements Resolve<any> {

    constructor(private readonly service: SgmServiceService) {
    }

    resolve(route: ActivatedRouteSnapshot): any {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id);
        }
        return new SGMService();
    }

}

export const routes: Routes = [
    {
        path: '',
        component: SgmServiceComponent,
        canActivate: [UserRouteAccessService],
        data: {
            authorities: ['ROLE_SERVICE_MANAGEMENT', 'ROLE_AUDITOR']
        }
    },
    {
        path: 'new',
        component: SgmServiceFormComponent,
        canActivate: [UserRouteAccessService],
        resolve: {
            service: UserManagementResolve
        },
        data: {
            isViewMode: false,
            label: 'service.form.label.new',
            authorities: ['ROLE_SERVICE_MANAGEMENT']
        }
    },
    {
        path: ':id/edit',
        component: SgmServiceFormComponent,
        canActivate: [UserRouteAccessService],
        resolve: {
            service: UserManagementResolve
        },
        data: {
            isViewMode: false,
            label: 'service.form.label.edit',
            authorities: ['ROLE_SERVICE_MANAGEMENT', 'ROLE_AUDITOR']
        }
    },
    {
        path: ':id/view',
        component: SgmServiceFormComponent,
        canActivate: [UserRouteAccessService],
        resolve: {
            service: UserManagementResolve
        },
        data: {
            isViewMode: true,
            label: 'service.form.label.view',
            authorities: ['ROLE_SERVICE_MANAGEMENT', 'ROLE_AUDITOR']
        }
    }
];
