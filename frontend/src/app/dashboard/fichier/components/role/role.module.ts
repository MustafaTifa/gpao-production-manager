import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    RoleComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    RoleComponent
  ]
})
export class RoleModule { }