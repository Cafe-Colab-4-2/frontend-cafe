import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { LinesGraphComponent } from './lines-graph/lines-graph.component';

// gRAFICOS
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    LinesGraphComponent,
  ],
  exports: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    LinesGraphComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ChartsModule
  ]
})
export class SharedModule { }
