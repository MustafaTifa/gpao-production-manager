import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserUtilService } from './utils/browser.util.service';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';

import { TableComponent } from './table/table.component';
import { MultiselectTableComponent } from './multiselect-table/multiselect-table.component';
import { DeleteComponentComponent } from './delete-component/delete-component.component';
import { NgxFileDropModule } from 'ngx-file-drop';

const modules = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatSidenavModule,
  MatSelectModule,
  MatPaginatorModule,
  MatSortModule,
  ReactiveFormsModule,
  MatAutocompleteModule,
  MatDialogModule,
  MatCheckboxModule,
  MatTabsModule,
  MatRadioModule,
  MatTooltipModule,
  FormsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatMenuModule,
  NgxFileDropModule
]

@NgModule({
  declarations: [
    TableComponent,
    MultiselectTableComponent,
    DeleteComponentComponent
  ],
  imports: [
    CommonModule,
    modules
  ],
  providers: [BrowserUtilService],
  exports: [...modules, TableComponent, MultiselectTableComponent]
})
export class SharedModule { }
