import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './core/services/auth.guard';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./modules/home/home.module').then((mod) => mod.HomeModule),
        pathMatch: 'full',
        canActivate: [AuthGuard]
    },
    {
        path: 'users',
        loadChildren: () => import('./modules/user/user.module').then((mod) => mod.UserModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'services',
        loadChildren: () => import('./modules/sgm-service/sgm-service.module').then((mod) => mod.SgmServiceModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'settings',
        loadChildren: () => import('./modules/settings/settings.module').then((mod) => mod.SettingsModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'citizen-services',
        loadChildren: () => import('./modules/citizen-service/citizen-service.module').then((mod) => mod.CitizenServiceModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'health-services',
        loadChildren: () => import('./modules/health-service/health-service.module').then((mod) => mod.HealthServiceModule),
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
