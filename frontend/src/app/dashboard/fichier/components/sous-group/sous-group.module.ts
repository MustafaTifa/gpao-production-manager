import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SousGroupComponent } from './sous-group.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    SousGroupComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    SousGroupComponent
  ]
})
export class SousGroupModule { }
