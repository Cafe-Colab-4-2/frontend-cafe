import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Modulos
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';
// Componentes
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';

const routes: Routes = [
  
  // path: '/home', component: PagesRoutingModule
  // path: '/login', component: AuthRoutingModule 
  
  
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NopagefoundComponent }
];

@NgModule({
  declarations: [],
  imports: [ 
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
