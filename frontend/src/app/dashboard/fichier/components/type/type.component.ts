import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Type } from 'src/api-v2/type/models/type';
import { TypeService } from 'src/api-v2/type/services/type-management.service';
import { ACTIONS } from 'src/app/shared/enum/Actions.enum';
import { Actions } from 'src/app/shared/table/table.component';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent implements OnInit {
  columns = [
    {
      prop: 'codeType',
      label: 'Code Type',
      cell: (element: Type) => `${element.codeType}`,
      filterable: true,
      filterOptions: {
        type: 'input',
        mode: 'cr',
        prop: 'codeType'
      }

    },
    {
      prop: 'libelle',
      label: 'Designation',
      cell: (element: Type) => `${element.libelle}`,
      filterable: true,
      sortable: true,
      filterOptions: {
        type: 'input',
        mode: 'cr',
        prop: 'libelle'
      }
    },
    {
      prop: 'observation',
      label: 'Observation',
      cell: (element: Type) => {return element.observation ? `${element.observation}` : '-'},
    },

  ];
  actions: Actions[] = [
    {
      icon: 'delete',
      name: 'delete'
    }
  ]
  dataSource = null;
  displayedColumns = [...this.columns.map(c => c.prop), 'action'];
  TypeForm: FormGroup;
  action: ACTIONS = ACTIONS.CREATE;
  defaultPageSize = 10;
  public resultsLength: any = 0;
  constructor(private _typeService: TypeService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize });
    this.TypeForm = new FormGroup({
      'id': new FormControl(),
      'codeType': new FormControl(null, Validators.required),
      'libelle': new FormControl(null, Validators.required),
      'observation': new FormControl(null),
    })
  }

  onTableChanges(tableChanges) {
    console.log('model change onTablechange : ', tableChanges);
    // this.loadingTable = true;
    const { paginator, filters, sort } = (tableChanges);
    this.defaultPageSize = paginator.pageSize;
    console.log('model change filtersss : ', filters);
    // localStorage.setItem('administration/audio-messages',JSON.stringify(this.defaultPageSize));
    this.loadData(paginator, filters, sort);
  }

  loadData(paginator, filters?, sort?) {
    this._typeService.getAllTypes$Response({
      page: paginator.pageIndex,
      size: paginator.pageSize,
      sort: sort ? [sort] : null,
      filters: filters
    }).subscribe(res => {
      this.resultsLength = Number(res.headers.get('X-Total-Count'))
      this.dataSource = res.body;
    })
  }

  clearFields() {
    this.TypeForm.reset();
    this.action = ACTIONS.CREATE
  }

  onSubmit() {
    if (this.action == ACTIONS.CREATE) {
      this.createType();
    } else {
      this.updateType();
    }
  }

  createType() {
    this._typeService.addType(this.TypeForm.value).subscribe(res => {
      console.log('res : ', res);
      this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize });
      this.toastr.success('Type ajouté avec succès', '', { toastClass: 'toastr-success' });
      this.clearFields();
    }, err => {
      this.toastr.error('Erreur', '', { toastClass: 'toastr-error' });
    })
  }

  updateType() {
    this._typeService.updateType(this.TypeForm.value).subscribe(res => {
      this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize });
      this.toastr.success('Type modifié avec succès', '', { toastClass: 'toastr-success' });
      this.clearFields();
    }, err => {
      this.toastr.error('Erreur', '', { toastClass: 'toastr-error' });
    })
  }

  onActionClicked(event) {
    if (event.action.name == ACTIONS.DELETE) {
      this._typeService.deleteType(event.data.id).subscribe(res => {
        this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize });
        this.toastr.success('Type supprimé avec succès', '', { toastClass: 'toastr-success' });
        this.clearFields();
      }, err => {
        this.toastr.error('Erreur', '', { toastClass: 'toastr-error' });
      })
    } else {
      this.TypeForm.setValue(event.data)
      this.action = ACTIONS.UPDATE;
    }
  }

}
