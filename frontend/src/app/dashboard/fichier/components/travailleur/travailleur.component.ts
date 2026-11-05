import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs/operators';
import { Travailleur } from 'src/api-v2/travailleur/models/travailleur';
import { TravailleurService } from 'src/api-v2/travailleur/services/travailleur-management.service';
import { Workstation } from 'src/api-v2/workstation/models';
import { WorkstationService } from 'src/api-v2/workstation/services/workstation-management.service';
import { ACTIONS } from 'src/app/shared/enum/Actions.enum';
import { MultiselectTableComponent } from 'src/app/shared/multiselect-table/multiselect-table.component';
import { Actions } from 'src/app/shared/table/table.component';

@Component({
  selector: 'app-travailleur',
  templateUrl: './travailleur.component.html',
  styleUrls: ['./travailleur.component.scss']
})
export class TravailleurComponent implements OnInit {

  columns = [
    {
      prop: 'codeTravailleur',
      label: 'Code Travailleur',
      cell: (element: Travailleur) => `${element.codeTravailleur}`,
      filterable: true,
      filterOptions: {
        type: 'input',
        mode: 'cr',
        prop: 'codeTravailleur'
      }

    },
    {
      prop: 'libelle',
      label: 'Designation',
      cell: (element: Travailleur) => `${element.libelle}`,
      filterable: true,
      sortable: true,
      filterOptions: {
        type: 'input',
        mode: 'cr',
        prop: 'libelle'
      }
    },
    {
      prop: 'workstation',
      label: 'Workstation',
      cell: (element: Travailleur) => `${element.workstation.codeWorkstation}`,
      filterable: true,
      sortable: true,
      filterOptions: {
        type: 'input',
        mode: 'cr',
        prop: 'workstation.codeWorkstation'
      }
    },
    {
      prop: 'observation',
      label: 'Observation',
      cell: (element: Travailleur) => {return element.observation ? `${element.observation}` : '-'},
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
  travailleurForm: FormGroup;
  action: ACTIONS = ACTIONS.CREATE;
  defaultPageSize = 10;
  public resultsLength: any = 0;
  workstationOptions: Observable<Workstation[]>;
  workstations = []
  constructor(private _travailleurService: TravailleurService,
    private _workstationService: WorkstationService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadData({pageIndex: 0, pageSize: this.defaultPageSize});
    this.travailleurForm = new FormGroup({
      'id': new FormControl(),
      'codeTravailleur': new FormControl(null, Validators.required),
      'libelle': new FormControl(null, Validators.required),
      'workstation': new FormControl(null,Validators.required),
      'observation': new FormControl(null),
    })
    this._workstationService.getAllWorkstations().pipe(map(workstations => workstations.map(workstation =>({id: workstation.id,codeWorkstation: workstation.codeWorkstation})))).subscribe(res => {
      this.workstations = res;
      this.workstationOptions = this.travailleurForm.get('workstation').valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : value?.codeGroupe;
          return name ? this._filter(name as string) : this.workstations.slice();
        }),
      );
      this.workstationOptions.subscribe(ff => {
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
    this._travailleurService.getAllTravailleurs$Response({
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
    this.travailleurForm.reset();
    this.action = ACTIONS.CREATE
  }

  onSubmit() {
    if (this.action == ACTIONS.CREATE) {
      this.createTravailleur();
    } else {
      this.updateTravailleur();
    }
  }

  createTravailleur() {
    this._travailleurService.addTravailleur(this.travailleurForm.value).subscribe(res => {
      this.loadData({pageIndex: 0, pageSize: this.defaultPageSize});
      this.toastr.success('Travailleur ajouté avec succès','', { toastClass: 'toastr-success' });
      this.clearFields();
    }, err => {
      console.log('err : ',err);

      this.toastr.error(err?.error?.message,'Erreur', { toastClass: 'toastr-error' });
    })
  }

  updateTravailleur() {
    console.log('this.this.travailleurForm : ',this.travailleurForm.value,this.travailleurForm.get('workstation').value);
    this._travailleurService.updateTravailleur(this.travailleurForm.value).subscribe(res => {
      console.log('res : ', res);
      this.loadData({pageIndex: 0, pageSize: this.defaultPageSize});
      this.toastr.success('Travailleur modifié avec succès','', { toastClass: 'toastr-success' });
      this.clearFields();
    },err => {
      this.toastr.error(err?.error?.message,'Erreur', { toastClass: 'toastr-error' });
    })
  }

  onActionClicked(event) {
    if (event.action.name == ACTIONS.DELETE) {
      this._travailleurService.deleteTravailleur(event.data.id).subscribe(res => {
        this.loadData({pageIndex: 0, pageSize: this.defaultPageSize});
        this.toastr.success('Travailleur supprimé avec succès','', { toastClass: 'toastr-success' });
        this.clearFields();
      },err => {
        this.toastr.error(err?.error?.message,'Erreur', { toastClass: 'toastr-error' });
      })
    } else {
      this.travailleurForm.setValue(event.data)
      this.action = ACTIONS.UPDATE;
    }
  }

  displayFn(workstation: Workstation): string {
    return workstation && workstation.codeWorkstation ? workstation.codeWorkstation : '';
  }

  private _filter(codeWorkstation: string): Workstation[] {
    const filterValue = codeWorkstation.toLowerCase();
    return this.workstations.filter(option => option.codeWorkstation.toLowerCase().includes(filterValue));
  }

}
