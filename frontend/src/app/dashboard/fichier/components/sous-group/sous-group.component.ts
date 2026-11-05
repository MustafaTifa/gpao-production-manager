import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, startWith } from 'rxjs';
import { Groupe } from 'src/api-v2/group/models';
import { GroupControllerService } from 'src/api-v2/group/services';
import { SousGroupe } from 'src/api-v2/sous-group/models/sous-groupe';
import { SousGroupControllerService } from 'src/api-v2/sous-group/services/sous-group-controller.service';
import { ACTIONS } from 'src/app/shared/enum/Actions.enum';
import { Actions } from 'src/app/shared/table/table.component';

@Component({
  selector: 'app-sous-group',
  templateUrl: './sous-group.component.html',
  styleUrls: ['./sous-group.component.scss']
})
export class SousGroupComponent implements OnInit {

  columns = [
    {
      prop: 'codeSousGroup',
      label: 'Code Sous-groupe',
      cell: (element: SousGroupe) => `${element.codeSousGroup}`,
      filterable: true,
      filterOptions: {
        type: 'input',
        mode: 'cr',
        prop: 'codeSousGroup'
      }

    },
    {
      prop: 'libelle',
      label: 'Designation',
      cell: (element: SousGroupe) => `${element.libelle}`,
      filterable: true,
      sortable: true,
      filterOptions: {
        type: 'input',
        mode: 'cr',
        prop: 'libelle'
      }
    },
    {
      prop: 'groupe',
      label: 'Groupe',
      cell: (element: SousGroupe) => `${element.groupe?.codeGroup ? element.groupe?.codeGroup +' - '+ element.groupe?.libelle : '-'}`,
      filterable: true,
      sortable: true,
      filterOptions: {
        type: 'input',
        mode: 'cr',
        prop: 'groupe.codeGroup'
      }
    },
    {
      prop: 'observation',
      label: 'Observation',
      cell: (element: SousGroupe) => {return element.observation ? `${element.observation}` : '-'},
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
  sousGroupForm: FormGroup;
  action: ACTIONS = ACTIONS.CREATE;
  defaultPageSize = 10;
  public resultsLength: any = 0;
  groupeOptions: Observable<Groupe[]>;
  groupes = []
  constructor(private _sousGroupService: SousGroupControllerService, private _groupeService: GroupControllerService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadData({pageIndex: 0, pageSize: this.defaultPageSize});
    this.sousGroupForm = new FormGroup({
      'id': new FormControl(),
      'codeSousGroup': new FormControl(null, Validators.required),
      'libelle': new FormControl(null, Validators.required),
      'groupe': new FormControl(null),
      'observation': new FormControl(null),
    })
    this._groupeService.getAllGroups().pipe(map(groupes => groupes.map(groupe =>({id: groupe.id,codeGroup: groupe.codeGroup,libelle: groupe.libelle})))).subscribe(res => {
      this.groupes = res;
      this.groupeOptions = this.sousGroupForm.get('groupe').valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : value?.codeGroupe;
          return name ? this._filter(name as string) : this.groupes.slice();
        }),
      );
      this.groupeOptions.subscribe(ff => {
        console.log('value : ',ff);
        return ff
      }) 
    })
  }

  onTableChanges(tableChanges) {
    const {paginator, filters, sort} = (tableChanges);
    this.defaultPageSize = paginator.pageSize;
    this.loadData(paginator, filters, sort);
  }

  loadData(paginator, filters?, sort?) {
    this._sousGroupService.getAllGroups$Response({
      page: paginator.pageIndex,
      size: paginator.pageSize,
      sort: sort ? [sort] : null,
      filters: filters
    }).subscribe(res => {
      this.resultsLength = Number(res.headers.get('X-Total-Count'))
      this.dataSource = res.body;
    }, err => {
      this.toastr.error(err?.error?.message,'Erreur', { toastClass: 'toastr-error' });
    })
  }

  clearFields() {
    this.sousGroupForm.reset();
    this.action = ACTIONS.CREATE
  }

  onSubmit() {
    if (this.action == ACTIONS.CREATE) {
      this.createSousGroup();
    } else {
      this.updateSousGroup();
    }
  }

  createSousGroup() {
    this._sousGroupService.addGroup(this.sousGroupForm.value).subscribe(res => {
      this.loadData({pageIndex: 0, pageSize: this.defaultPageSize});
      this.toastr.success('Sous groupe ajouté avec succès','', { toastClass: 'toastr-success' });
      this.clearFields();
    }, err => {
      console.log('err : ',err);

      this.toastr.error(err?.error?.message,'Erreur', { toastClass: 'toastr-error' });
    })
  }

  updateSousGroup() {
    console.log('this.this.sousGroupForm : ',this.sousGroupForm.value,this.sousGroupForm.get('groupe').value);
    this._sousGroupService.updateGroup(this.sousGroupForm.value).subscribe(res => {
      console.log('res : ', res);
      this.loadData({pageIndex: 0, pageSize: this.defaultPageSize});
      this.toastr.success('Sous groupe modifié avec succès','', { toastClass: 'toastr-success' });
      this.clearFields();
    },err => {
      this.toastr.error(err?.error?.message,'Erreur', { toastClass: 'toastr-error' });
    })
  }

  onActionClicked(event) {
    if (event.action.name == ACTIONS.DELETE) {
      this._sousGroupService.deleteGroup(event.data.id).subscribe(res => {
        this.loadData({pageIndex: 0, pageSize: this.defaultPageSize});
        this.toastr.success('Sous groupe supprimé avec succès','', { toastClass: 'toastr-success' });
        this.clearFields();
      },err => {
        this.toastr.error(err?.error?.message,'Erreur', { toastClass: 'toastr-error' });
      })
    } else {
      this.sousGroupForm.setValue(event.data)
      this.action = ACTIONS.UPDATE;
    }
  }

  displayFn(groupe: Groupe): string {
    return groupe && groupe.codeGroup ? `${groupe.codeGroup} - ${groupe.libelle}` : '';
  }

  private _filter(codeGroup: string): Groupe[] {
    const filterValue = codeGroup.toLowerCase();
    return this.groupes.filter(option => option.codeGroup.toLowerCase().includes(filterValue));
  }

}
