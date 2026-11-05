import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CFI } from 'src/api-v2/cfi/models/cfi';
import { CfiService } from 'src/api-v2/cfi/services/cfi-management.service';
import { ACTIONS } from 'src/app/shared/enum/Actions.enum';
import { Actions } from 'src/app/shared/table/table.component';

@Component({
  selector: 'app-cfi',
  templateUrl: './cfi.component.html',
  styleUrls: ['./cfi.component.scss']
})
export class CfiComponent implements OnInit {
  columns = [
    {
      prop: 'codeCFI',
      label: 'Code CFI',
      cell: (element: CFI) => `${element.codeCFI}`,
      filterable: true,
      filterOptions: {
        type: 'input',
        mode: 'cr',
        prop: 'codeCFI'
      }

    },
    {
      prop: 'libelle',
      label: 'Designation',
      cell: (element: CFI) => `${element.libelle}`,
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
      cell: (element: CFI) => {return element.observation ? `${element.observation}` : '-'},
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
  CFIForm: FormGroup;
  action: ACTIONS = ACTIONS.CREATE;
  defaultPageSize = 10;
  public resultsLength: any = 0;
  constructor(private _CFIService: CfiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize });
    this.CFIForm = new FormGroup({
      'id': new FormControl(),
      'codeCFI': new FormControl(null, Validators.required),
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
    this._CFIService.getAllCfIs$Response({
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
    this.CFIForm.reset();
    this.action = ACTIONS.CREATE
  }

  onSubmit() {
    if (this.action == ACTIONS.CREATE) {
      this.createCFI();
    } else {
      this.updateCFI();
    }
  }

  createCFI() {
    this._CFIService.addCfi(this.CFIForm.value).subscribe(res => {
      console.log('res : ', res);
      this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize });
      this.toastr.success('CFI ajouté avec succès', '', { toastClass: 'toastr-success' });
      this.clearFields();
    }, err => {
      this.toastr.error('Erreur', '', { toastClass: 'toastr-error' });
    })
  }

  updateCFI() {
    this._CFIService.updateCfi(this.CFIForm.value).subscribe(res => {
      this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize });
      this.toastr.success('CFI modifié avec succès', '', { toastClass: 'toastr-success' });
      this.clearFields();
    }, err => {
      this.toastr.error('Erreur', '', { toastClass: 'toastr-error' });
    })
  }

  onActionClicked(event) {
    if (event.action.name == ACTIONS.DELETE) {
      this._CFIService.deleteCfi(event.data.id).subscribe(res => {
        this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize });
        this.toastr.success('CFI supprimé avec succès', '', { toastClass: 'toastr-success' });
        this.clearFields();
      }, err => {
        this.toastr.error('Erreur', '', { toastClass: 'toastr-error' });
      })
    } else {
      this.CFIForm.setValue(event.data)
      this.action = ACTIONS.UPDATE;
    }
  }

}
