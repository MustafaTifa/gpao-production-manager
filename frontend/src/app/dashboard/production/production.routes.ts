import { RouterModule, Routes } from "@angular/router";
import { ProductionComponent } from "./production.component";
import { OfInternComponent } from "./components/of-intern/of-intern.component";
import { NgModule } from "@angular/core";
import { OfSuiviComponent } from "./components/of-suivi/of-suivi.component";
import { SuiviOperationComponent } from "./components/of-suivi/suivi-operation/suivi-operation.component";
import { OfExternComponent } from "./components/of-extern/of-extern.component";
import { PiecesUnitaireComponent } from "./components/of-extern/pieces-unitaire/pieces-unitaire.component";
import { OfExternSuiviComponent } from "./components/of-extern-suivi/of-extern-suivi.component";
import { SuiviProductionComponent } from "./components/suivi-production/suivi-production.component";

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'prefix',
        component: ProductionComponent,
        children: [
            {
                path: '',
                component: OfInternComponent
            },
            {
                path: 'of_intern',
                component: OfInternComponent
            },
            {
                path: 'suivi_of_intern',
                component: OfSuiviComponent
            },
            {
                path: 'suivi_of_intern/operation',
                component: SuiviOperationComponent
            },
            {
                path: 'of_extern',
                component: OfExternComponent,
            },
            {
                path: 'of_extern/piece_unitaire/:id/:numberOF',
                component: PiecesUnitaireComponent,
            },
            {
                path: 'suivi_of_extern',
                component: OfExternSuiviComponent
            },
            {
                path: 'suivi_production',
                component: SuiviProductionComponent
            },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductionRoutingModule { }