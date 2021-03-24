import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

// Componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { ComponentsModule } from '../components/components.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UsersComponent } from './mantenimientos/users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { TablesComponent } from './mantenimientos/tables/tables.component';
import { PedidosLlevarComponent } from './mantenimientos/pedidos-llevar/pedidos-llevar.component';





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
    TablesComponent,
    PedidosLlevarComponent,

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
    HttpClientModule,
    DragDropModule
  ]
})
export class PagesModule { }
