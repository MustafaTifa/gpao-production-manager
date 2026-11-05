import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FichierComponent } from './fichier/fichier.component';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule, routes } from './dashboard.routing.module';
import { ProductionComponent } from './production/production.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { FichierModule } from './fichier/fichier.module';
import { ProductionModule } from './production/production.module';



@NgModule({
  declarations: [
    // FichierComponent,
    // ProductionComponent,
    TopMenuComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FichierModule,
    ProductionModule,
    SharedModule
  ],
  exports: [TopMenuComponent,DashboardComponent]
})
export class DashboardModule { }
