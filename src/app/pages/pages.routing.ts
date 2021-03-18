import { NuevodetalleComponent } from './mantenimientos/detallefactura/nuevodetalle/nuevodetalle.component';
import { ListardetalleComponent } from './mantenimientos/detallefactura/listardetalle/listardetalle.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../guards/auth.guard';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UsersComponent } from './mantenimientos/users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { FacturaComponent } from './dashboard/factura/factura.component';


const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
          { path: '',                 component: DashboardComponent,         data: { titulo: 'Dashboard'} },
          { path: 'progress',         component: ProgressComponent,          data: { titulo: 'Progress'} },
          { path: 'account-settings', component: AccountSettingsComponent,   data: { titulo: 'Account Settings'} },
          { path: 'promises',         component: PromisesComponent,          data: { titulo: 'Promises'} },
          { path: 'rxjs',             component: RxjsComponent,              data: { titulo: 'Rxjs'} },
          { path: 'users',            component: UsersComponent,             data: { titulo: 'Users of App'} },
          { path: 'profile',          component: ProfileComponent,           data: { titulo: 'My Profile'} },
          { path: 'factura',          component:FacturaComponent,            data: { titulo: 'Factura'} }
        ]
      },


    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
