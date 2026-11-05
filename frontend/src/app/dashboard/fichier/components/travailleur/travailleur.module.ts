import { NgModule } from "@angular/core";
import { TravailleurComponent } from "./travailleur.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
    declarations: [
        TravailleurComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [
        TravailleurComponent
    ]
})
export class TravailleurModule { }