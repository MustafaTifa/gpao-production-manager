import { SelectionModel } from '@angular/cdk/collections';
import { AfterContentInit, AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

interface FilterConfig {
  type?: 'input' | 'select',
  prop?: string,
  mode?: 'cr' | 'eq' | 'in' | 'sw' | 'ed',
  value?: any,
}

interface TableChanges {
  sort?: any,
  page?: number,
  filters?: FilterConfig,
  paginator?: PageEvent,
}

export class Actions {
  icon: string;
  name: string;
  tooltip?: string
}

@Component({
  selector: 'soma-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterContentInit, OnDestroy, OnChanges  {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() dataSource;
  @Input() columns;
  @Input() actions;
  @Input() displayedColumns;
  @Input() resultsLength: number;
  @Input() multiSelect: boolean;
  @Input() singleSelect: boolean;
  @Input() hideActions: boolean;
  @Input() hidePagination: boolean;
  @Input() previewMode: boolean;
  @Output() onActionClicked: EventEmitter<{ action: Actions, data: any }> = new EventEmitter<{ action: Actions, data: any }>();
  @Output() tableChanges: EventEmitter<TableChanges> = new EventEmitter<TableChanges>();
  @Output() selectionChanges: EventEmitter<any[]> = new EventEmitter<any[]>();

  private filterChange$: Subject<null> = new Subject();
  selection = new SelectionModel<any>(true, []);
  public sort: Sort
  public filterColumns = [];
  public NbrOfcolumnWithFilter: number = 0;
  public filters: FilterConfig[] = []
  filterIputs: { [key: string]: string } = {};
  value
  constructor() { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource'] && changes['dataSource'].currentValue) {
      if(this.multiSelect){
        this.setSelectedItems()
      }
    }

  }

  ngOnDestroy(): void {
    this.filterChange$.unsubscribe();
  }
  ngAfterContentInit(): void {
    this.addFiltersColumnDefs()
    
  }


  ngOnInit(): void {
    console.log('multiSelect : ', this.multiSelect);
    if (this.multiSelect || this.singleSelect) {
      this.selection.changed.subscribe(() => {
        this.selectionChanges.emit(this.selection.selected)
      })
    }
    this.filterChange$.pipe(debounceTime(400)).subscribe((column) => {
      this.setFilter(column);
    });
    this.columns.forEach(column => {
      if (column.filterOptions) {
        this.filterIputs[column.prop] = '';
      }
    })
    
  }

  onNgModelChange(column?) {
    this.value = column?.value;
    let filter = { ...column, value: this.filterIputs[column.prop] }
    console.log('resultsLength : ', filter);
    this.filterChange$.next(filter);
  }

  clearFilter(column) {
    this.filterIputs[column.prop] = '';
    this.onNgModelChange(column)
  }

  private addFiltersColumnDefs() {
    this.filterColumns = this.columns.map(({ prop, filterable }) => {
      return filterable ? prop + 'Filters' : 'empty';
    })
    this.NbrOfcolumnWithFilter = this.filterColumns.filter(col => col != 'empty').length;
    if(this.multiSelect)
      this.filterColumns.unshift('empty')
    //.filter(name => name.includes('Filters'));
    console.log('filterrr : ', this.filterColumns);
  }

  private setFilter(column) {
    console.log('model change----', column)
    // if(column.type == 'input'){
      if (column?.value) {
        if (this.filters.find(filter => filter.prop == column?.prop)) {
          this.filters.map(filter => filter.value = column?.value)
        } else {
          this.filters.push(column)
        }
      } else {
        if (this.filters.find(filter => filter.prop == column?.prop)) {
          this.filters = this.filters.filter(filter => filter.prop != column?.prop)
        }
      }
    // } else {
    //   if(this.value != 'empty'){
    //     if (this.filters.find(filter => filter.prop == column?.prop)) {
    //       this.filters.map(filter => filter.value = column?.value)
    //     } else {
    //       this.filters.push(column)
    //     }
    //   }
    // }
    console.log('model change', this.filters)
    this.emitChanges()
  }

  public handlePageEvent(event: PageEvent) {
    this.paginator.pageIndex = event.pageIndex
    this.paginator.pageSize = event.pageSize
    this.emitChanges()
  }

  public sortData(sort: Sort) {
    this.sort = sort;
    this.emitChanges();
  }
  public onAction(action, row) {
    console.log('articleFrom rox : ',row);
    if(!this.previewMode){
      if(this.multiSelect)
        return;
      this.onActionClicked.emit({ action: action, data: row })
    }
  }
  public emitChanges() {
    this.tableChanges.emit({
      filters: this.filters.map(filter => `${filter.mode},${filter.prop},${filter.value}`),
      paginator: this.paginator,
      sort: this.sort && this.sort?.direction ? `${this.sort?.active},${this.sort?.direction}` : '',
    } as TableChanges);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource?.length;

    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource);

  }

  setSelectedItems(){
    this.dataSource.map(row => {
      if(row.checked){
        this.selection.select(row)
      }
    })
  }

  radioClick(row){
    this.selection.clear();
    this.selection.select(row)
  }

}
