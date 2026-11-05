import { RouterModule, Routes } from "@angular/router";
import { GroupComponent } from "./components/group/group.component";
import { SousGroupComponent } from "./components/sous-group/sous-group.component";
import { FichierComponent } from "./fichier.component";
import { TypeComponent } from "./components/type/type.component";
import { CfiComponent } from "./components/cfi/cfi.component";
import { WorkstationComponent } from "./components/workstation/workstation.component";
import { TravailleurComponent } from "./components/travailleur/travailleur.component";
import { EnginComponent } from "./components/engin/engin.component";
import { ArticleComponent } from "./components/article/article.component";
import { RoleComponent } from "./components/role/role.component";
import { UserComponent } from "./components/user/user.component";
import { NgModule } from "@angular/core";

export const routes: Routes = [
    {
        path: '',
        component: FichierComponent,
        children: [
            {
                path: '',
                component: ArticleComponent
            },
            {
                path: 'article',
                component: ArticleComponent
            },
            {
                path: 'groupe',
                component: GroupComponent
            },
            {
                path: 'sous-groupe',
                component: SousGroupComponent
            },
            {
                path: 'type',
                component: TypeComponent
            },
            {
                path: 'cfi',
                component: CfiComponent
            },
            {
                path: 'poste-travaille',
                component: WorkstationComponent
            },
            {
                path: 'travailleur',
                component: TravailleurComponent
            },
            {
                path: 'engin',
                component: EnginComponent
            },
            {
                path: 'roles',
                component: RoleComponent
            },
            {
                path: 'users',
                component: UserComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FichierRoutingModule { }