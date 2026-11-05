import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, startWith } from 'rxjs';
import { CFI } from 'src/api-v2/cfi/models/cfi';
import { CfiService } from 'src/api-v2/cfi/services/cfi-management.service';
import { Workstation } from 'src/api-v2/workstation/models/workstation';
import { WorkstationService } from 'src/api-v2/workstation/services/workstation-management.service';
import { ACTIONS } from 'src/app/shared/enum/Actions.enum';
import { Actions } from 'src/app/shared/table/table.component';

@Component({
  selector: 'app-workstation',
  templateUrl: './workstation.component.html',
  styleUrls: ['./workstation.component.scss']
})
export class WorkstationComponent implements OnInit {

  columns = [
    {
      prop: 'codeWorkstation',
      label: 'Code poste de travaille',
      cell: (element: Workstation) => `${element.codeWorkstation}`,
      filterable: true,
      filterOptions: {
        type: 'input',
        mode: 'cr',
        prop: 'codeWorkstation'
      }

    },
    {
      prop: 'libelle',
      label: 'Designation',
      cell: (element: Workstation) => `${element.libelle}`,
      filterable: true,
      sortable: true,
      filterOptions: {
        type: 'input',
        mode: 'cr',
        prop: 'libelle'
      }
    },
    {
      prop: 'cfi',
      label: 'Designation',
      cell: (element: Workstation) => `${element.cfi?.libelle}`,
      // filterable: true,
      // sortable: true,
      // filterOptions: {
      //   type: 'input',
      //   mode: 'cr',
      //   prop: 'libelle'
      // }
    },
    {
      prop: 'observation',
      label: 'Observation',
      cell: (element: Workstation) => {return element.observation ? `${element.observation}` : '-'},
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
  WorkstationForm: FormGroup;
  action: ACTIONS = ACTIONS.CREATE;
  defaultPageSize = 10;
  public resultsLength: any = 0;
  cfiOptions: Observable<CFI[]>;
  cfis = []
  constructor(private _WorkstationService: WorkstationService, private _CFIService: CfiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize });
    this.WorkstationForm = new FormGroup({
      'id': new FormControl(),
      'codeWorkstation': new FormControl(null, Validators.required),
      'libelle': new FormControl(null, Validators.required),
      'cfi': new FormControl(null, Validators.required),
      'observation': new FormControl(null),
    })
    this._CFIService.getAllCfIs().pipe(map(cfis => cfis.map(cfi => ({ id: cfi.id, codeCFI: cfi.codeCFI, libelle: cfi.libelle })))).subscribe(res => {
      this.cfis = res;
      this.cfiOptions = this.WorkstationForm.get('cfi').valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : value?.codeCFI;
          return name ? this._filter(name as string) : this.cfis.slice();
        }),
      );
      this.cfiOptions.subscribe(ff => {
        console.log('value : ', ff);
        return ff
      })
    })
  }

  onTableChanges(tableChanges) {
    console.log('model change onTablechange : ', tableChanges);
    const { paginator, filters, sort } = (tableChanges);
    this.defaultPageSize = paginator.pageSize;
    this.loadData(paginator, filters, sort);
  }

  loadData(paginator, filters?, sort?) {
    this._WorkstationService.getAllWorkstations$Response({
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
    this.WorkstationForm.reset();
    this.action = ACTIONS.CREATE
  }

  onSubmit() {
    if (this.action == ACTIONS.CREATE) {
      this.createWorkstation();
    } else {
      this.updateWorkstation();
    }
  }

  createWorkstation() {
    this._WorkstationService.addWorkstation(this.WorkstationForm.value).subscribe(res => {
      console.log('res : ', res);
      this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize });
      this.toastr.success('Workstation ajouté avec succès', '', { toastClass: 'toastr-success' });
      this.clearFields();
    }, err => {
      this.toastr.error('Erreur', '', { toastClass: 'toastr-error' });
    })
  }

  updateWorkstation() {
    this._WorkstationService.updateWorkstation(this.WorkstationForm.value).subscribe(res => {
      this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize });
      this.toastr.success('Workstation modifié avec succès', '', { toastClass: 'toastr-success' });
      this.clearFields();
    }, err => {
      this.toastr.error('Erreur', '', { toastClass: 'toastr-error' });
    })
  }

  onActionClicked(event) {
    if (event.action.name == ACTIONS.DELETE) {
      this._WorkstationService.deleteWorkstation(event.data.id).subscribe(res => {
        this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize });
        this.toastr.success('Workstation supprimé avec succès', '', { toastClass: 'toastr-success' });
        this.clearFields();
      }, err => {
        this.toastr.error('Erreur', '', { toastClass: 'toastr-error' });
      })
    } else {
      this.WorkstationForm.setValue(event.data)
      this.action = ACTIONS.UPDATE;
    }
  }

  displayFn(cfi: CFI): string {
    return cfi && cfi.codeCFI ? `${cfi.codeCFI} - ${cfi.libelle}` : '';
  }

  private _filter(codeCFI: string): CFI[] {
    const filterValue = codeCFI.toLowerCase();
    return this.cfis.filter(option => option.codeCFI.toLowerCase().includes(filterValue));
  }

}
