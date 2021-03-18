import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Componentes
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { ComponentsModule } from '../components/components.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UsersComponent } from './mantenimientos/users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { ListarComponent } from './mantenimientos/cliente/listar/listar.component';
import { NuevoComponent } from './mantenimientos/cliente/nuevo/nuevo.component';
import { EditarComponent } from './mantenimientos/cliente/editar/editar.component';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
    UsersComponent,
    ProfileComponent,
    ListarComponent,
    NuevoComponent,
    EditarComponent
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    AccountSettingsComponent,
    PromisesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    HttpClientModule
  ]
})
export class PagesModule { }
