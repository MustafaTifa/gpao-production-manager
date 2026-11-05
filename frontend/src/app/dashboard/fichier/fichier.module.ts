import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FichierRoutingModule, routes } from './fichier.routes.module';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { FichierComponent } from './fichier.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GroupComponent } from './components/group/group.component';
import { SousGroupComponent } from './components/sous-group/sous-group.component';
import { GroupModule } from './components/group/group.module';
import { SousGroupModule } from './components/sous-group/sous-group.module';
import { TypeComponent } from './components/type/type.component';
import { CfiComponent } from './components/cfi/cfi.component';
import { WorkstationComponent } from './components/workstation/workstation.component';
import { TravailleurComponent } from './components/travailleur/travailleur.component';
import { TravailleurModule } from './components/travailleur/travailleur.module';
import { EnginComponent } from './components/engin/engin.component';
import { ArticleComponent } from './components/article/article.component';
import { NomenclatureComponent } from './components/nomenclature/nomenclature.component';
import { GammeComponent } from './components/gamme/gamme.component';
import { GEDComponent } from './components/ged/ged.component';
import { HistoriqueComponent } from './components/historique/historique.component';
import { StockCheckDialogComponent } from './components/nomenclature/stock-check-dialog/stock-check-dialog.component';
import { RoleModule } from './components/role/role.module';
import { UserModule } from './components/user/user.module';



@NgModule({
  declarations: [
    LeftMenuComponent,
    FichierComponent,
    TypeComponent,
    CfiComponent,
    WorkstationComponent,
    EnginComponent,
    ArticleComponent,
    NomenclatureComponent,
    GammeComponent,
    GEDComponent,
    HistoriqueComponent,
    StockCheckDialogComponent,
    // TravailleurComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    GroupModule,
    SousGroupModule,
    TravailleurModule,
    RoleModule,
    UserModule,
    FichierRoutingModule
  ],
  exports: [
    LeftMenuComponent,
    FichierComponent,
  ]
})
export class FichierModule { }
