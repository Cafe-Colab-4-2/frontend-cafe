import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';


const routes: Routes = [
    { 
        path: 'dashboard', component: PagesComponent,
        children: [
          { path: '',                 component: DashboardComponent,        data: { titulo: 'Dashboard'} },
          { path: 'progress',         component: ProgressComponent,         data: { titulo: 'Progress'} },
          { path: 'account-settings', component: AccountSettingsComponent,  data: { titulo: 'Account Settings'} },
          { path: 'promises',         component: PromisesComponent,         data: { titulo: 'Promises'} },
          { path: 'rxjs',             component: RxjsComponent,             data: { titulo: 'Rxjs'} }  
          
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
