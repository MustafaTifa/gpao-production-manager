import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { NgModule } from "@angular/core";
import { AuthGuard } from "../core/guards/auth.guard";

export const routes: Routes = [
    {
        path: '',
        // pathMatch: 'prefix',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'fichier/article',
                pathMatch: 'full'
            },
            {
                path: 'fichier',
                loadChildren: () => import('./fichier/fichier.module').then(m => m.FichierModule)
            },
            {
                path: 'production',
                loadChildren: () => import('./production/production.module').then(m => m.ProductionModule)
            }

        ]
    },
    { path: '', redirectTo: 'fichier/article', pathMatch: 'full' }, // Default to dashboard
    { path: '**', redirectTo: 'fichier/article' },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule { }