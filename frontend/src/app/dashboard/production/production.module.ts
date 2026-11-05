import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfInternComponent } from './components/of-intern/of-intern.component';
import { OfExternComponent } from './components/of-extern/of-extern.component';
import { ProductionComponent } from './production.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { RouterModule } from '@angular/router';
import { ProductionRoutingModule, routes } from './production.routes';
import { SharedModule } from 'src/app/shared/shared.module';
import { OfInternModule } from './components/of-intern/of-intern.module';
import { OfSuiviComponent } from './components/of-suivi/of-suivi.component';
import { SuiviOperationComponent } from './components/of-suivi/suivi-operation/suivi-operation.component';
import { PiecesSupComponent } from './components/of-suivi/pieces-sup/pieces-sup.component';
import { PiecesUnitaireComponent } from './components/of-extern/pieces-unitaire/pieces-unitaire.component';
import { OfExternSuiviComponent } from './components/of-extern-suivi/of-extern-suivi.component';
import { SuiviProductionComponent } from './components/suivi-production/suivi-production.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';



@NgModule({
  declarations: [
    ProductionComponent,
    OfInternComponent,
    OfExternComponent,
    LeftMenuComponent,
    OfSuiviComponent,
    SuiviOperationComponent,
    PiecesUnitaireComponent,
    PiecesSupComponent,
    OfExternSuiviComponent,
    SuiviProductionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    // OfInternModule,
    ProductionRoutingModule,
    NgxChartsModule
  ],
  exports: [
    ProductionComponent,
    LeftMenuComponent
  ]
})
export class ProductionModule { }
