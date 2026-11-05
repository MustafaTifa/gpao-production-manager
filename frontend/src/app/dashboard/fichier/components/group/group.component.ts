import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Groupe } from 'src/api-v2/group/models';
import { GroupControllerService } from 'src/api-v2/group/services/group-controller.service';
import { ACTIONS } from 'src/app/shared/enum/Actions.enum';
import { Actions } from 'src/app/shared/table/table.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  columns = [
    // {
    //   prop: 'Id',
    //   label: 'No.',
    //   cell: (element: Groupe) => `${element.id}`,
    //   filterable: true,
    //   filterOptions: {
    //     type: 'input',
    //     mode: 'cr',
    //     prop: 'id'
    //   }

    // },
    {
      prop: 'codeGroup',
      label: 'Code groupe',
      cell: (element: Groupe) => `${element.codeGroup}`,
      filterable: true,
      filterOptions: {
        type: 'input',
        mode: 'cr',
        prop: 'codeGroup'
      }

    },
    {
      prop: 'libelle',
      label: 'Designation',
      cell: (element: Groupe) => `${element.libelle}`,
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
      cell: (element: Groupe) => {return element.observation ? `${element.observation}` : '-'},
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
  groupForm: FormGroup;
  action: ACTIONS = ACTIONS.CREATE;
  defaultPageSize = 10;
  public resultsLength: any = 0;
  constructor(private _groupService: GroupControllerService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadData({pageIndex: 0, pageSize: this.defaultPageSize});
    this.groupForm = new FormGroup({
      'id': new FormControl(),
      'codeGroup': new FormControl(null, Validators.required),
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
    this._groupService.getAllGroups$Response({
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
    this.groupForm.reset();
    this.action = ACTIONS.CREATE
  }

  onSubmit() {
    if (this.action == ACTIONS.CREATE) {
      this.createGroup();
    } else {
      this.updateGroup();
    }
  }

  createGroup() {
    this._groupService.addGroup(this.groupForm.value).subscribe(res => {
      console.log('res : ', res);
      this.loadData({pageIndex: 0, pageSize: this.defaultPageSize});
      this.toastr.success('Groupe ajouté avec succès','', { toastClass: 'toastr-success' });
      this.clearFields();
    }, err => {
      this.toastr.error('Erreur','', { toastClass: 'toastr-error' });
    })
  }

  updateGroup() {
    this._groupService.updateGroup(this.groupForm.value).subscribe(res => {
      this.loadData({pageIndex: 0, pageSize: this.defaultPageSize});
      this.toastr.success('Groupe modifié avec succès','', { toastClass: 'toastr-success' });
      this.clearFields();
    },err => {
      this.toastr.error('Erreur','', { toastClass: 'toastr-error' });
    })
  }

  onActionClicked(event) {
    if (event.action.name == ACTIONS.DELETE) {
      this._groupService.deleteGroup(event.data.id).subscribe(res => {
        this.loadData({pageIndex: 0, pageSize: this.defaultPageSize});
        this.toastr.success('Groupe supprimé avec succès','', { toastClass: 'toastr-success' });
        this.clearFields();
      },err => {
        this.toastr.error('Erreur','', { toastClass: 'toastr-error' });
      })
    } else {
      this.groupForm.setValue(event.data)
      this.action = ACTIONS.UPDATE;
    }
  }

}
