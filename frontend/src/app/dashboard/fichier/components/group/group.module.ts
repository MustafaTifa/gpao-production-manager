import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupComponent } from './group.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    GroupComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    GroupComponent
  ]
})
export class GroupModule { }
