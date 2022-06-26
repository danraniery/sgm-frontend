import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './core/services/auth.guard';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./modules/home/home.module').then((mod) => mod.HomeModule),
        pathMatch: 'full',
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
