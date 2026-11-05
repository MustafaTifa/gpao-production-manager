import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Engin } from 'src/api-v2/engin/models';
import { EnginService } from 'src/api-v2/engin/services/engin-management.service';
import { ACTIONS } from 'src/app/shared/enum/Actions.enum';
import { Actions } from 'src/app/shared/table/table.component';

@Component({
  selector: 'app-engin',
  templateUrl: './engin.component.html',
  styleUrls: ['./engin.component.scss']
})
export class EnginComponent implements OnInit {

  columns = [
    // {
    //   prop: 'Id',
    //   label: 'No.',
    //   cell: (element: Engin) => `${element.id}`,
    //   filterable: true,
    //   filterOptions: {
    //     type: 'input',
    //     mode: 'cr',
    //     prop: 'id'
    //   }

    // },
    {
      prop: 'codeEngin',
      label: 'Code engin',
      cell: (element: Engin) => `${element.codeEngin}`,
      filterable: true,
      filterOptions: {
        type: 'input',
        mode: 'cr',
        prop: 'codeEngin'
      }

    },
    {
      prop: 'libelle',
      label: 'Designation',
      cell: (element: Engin) => `${element.libelle}`,
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
      cell: (element: Engin) => {return element.observation ? `${element.observation}` : '-'},
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
  enginForm: FormGroup;
  action: ACTIONS = ACTIONS.CREATE;
  defaultPageSize = 10;
  public resultsLength: any = 0;
  constructor(private _enginService: EnginService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadData({pageIndex: 0, pageSize: this.defaultPageSize});
    this.enginForm = new FormGroup({
      'id': new FormControl(),
      'codeEngin': new FormControl(null, Validators.required),
      'libelle': new FormControl(null, Validators.required),
      'observation': new FormControl(null),
    })
  }

  onTableChanges(tableChanges) {
    console.log('model change onTablechange : ', tableChanges);
    // this.loadingTable = true;
    const {paginator, filters, sort} = (tableChanges);
    this.defaultPageSize = paginator.pageSize;
    console.log('model change filtersss : ',filters);
    // localStorage.setItem('administration/audio-messages',JSON.stringify(this.defaultPageSize));
    this.loadData(paginator, filters, sort);
  }

  loadData(paginator, filters?, sort?) {
    this._enginService.getAllEngins$Response({
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
    this.enginForm.reset();
    this.action = ACTIONS.CREATE
  }

  onSubmit() {
    if (this.action == ACTIONS.CREATE) {
      this.createEngin();
    } else {
      this.updateEngin();
    }
  }

  createEngin() {
    this._enginService.addEngin(this.enginForm.value).subscribe(res => {
      console.log('res : ', res);
      this.loadData({pageIndex: 0, pageSize: this.defaultPageSize});
      this.toastr.success('Engin ajouté avec succès','', { toastClass: 'toastr-success' });
      this.clearFields();
    }, err => {
      this.toastr.error('Erreur','', { toastClass: 'toastr-error' });
    })
  }

  updateEngin() {
    this._enginService.updateEngin(this.enginForm.value).subscribe(res => {
      this.loadData({pageIndex: 0, pageSize: this.defaultPageSize});
      this.toastr.success('Engin modifié avec succès','', { toastClass: 'toastr-success' });
      this.clearFields();
    },err => {
      this.toastr.error('Erreur','', { toastClass: 'toastr-error' });
    })
  }

  onActionClicked(event) {
    if (event.action.name == ACTIONS.DELETE) {
      this._enginService.deleteEngin(event.data.id).subscribe(res => {
        this.loadData({pageIndex: 0, pageSize: this.defaultPageSize});
        this.toastr.success('Engin supprimé avec succès','', { toastClass: 'toastr-success' });
        this.clearFields();
      },err => {
        this.toastr.error('Erreur','', { toastClass: 'toastr-error' });
      })
    } else {
      this.enginForm.setValue(event.data)
      this.action = ACTIONS.UPDATE;
    }
  }

}
