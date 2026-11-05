import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-multiselect-table',
  templateUrl: './multiselect-table.component.html',
  styleUrls: ['./multiselect-table.component.scss']
})
export class MultiselectTableComponent implements OnInit {

  public resultsLength: any = 0;
  dataSource = null;
  itemsSelected = [];
  constructor(
    public dialogRef: MatDialogRef<MultiselectTableComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string,
      model: any[],
      articleId: number,
      getData: Function,
      width?: string,
      singleSelect?: boolean,
      multiSelect: boolean,
      fromUnitPrice?: boolean,
      previewMode?: boolean,
      hidePagination?: boolean
      heigth?: string,
      displayedColumns;
      columns;
    }
  ) { }

  ngOnInit(): void {
    console.log('columnsss : ',this.data.columns);
    if(this.data.model){
      this.dataSource = this.data.model
    } else {
      this.loadData({pageIndex: 0, pageSize: 10})
    }
  }

  loadData(paginator, filters?, sort?){
    this.data.getData({
      page: paginator.pageIndex,
      size: paginator.pageSize,
      sort: sort ? [sort] : null,
      filters: filters
    }).subscribe(res=> {
      console.log('resssss : ',res);
      this.resultsLength = Number(res.headers?.get('X-Total-Count'))
      this.dataSource = res.body;
    })
  }

  selectionChanges(event){
    this.itemsSelected = event
  }

  onTableChanges(tableChanges) {
    const {paginator, filters, sort} = (tableChanges);
    console.log('multiselect : ',filters);
    this.loadData(paginator, filters, sort);
  }

  onActionClicked(event){
    this.itemsSelected = event.data
    console.log('itemsSelected : ',this.itemsSelected);
    this.dialogRef.close(this.itemsSelected);
  }
}
