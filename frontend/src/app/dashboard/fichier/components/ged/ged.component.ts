import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { ToastrService } from 'ngx-toastr';
import { GEDParam } from 'src/api-v2/ged/fn/ged-management/add-ged';
import { Ged } from 'src/api-v2/ged/models';
import { GedService } from 'src/api-v2/ged/services/ged-management.service';
import { ACTIONS } from 'src/app/shared/enum/Actions.enum';
import { SharedService } from 'src/app/shared/shared.service';
import { Actions } from 'src/app/shared/table/table.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ged',
  templateUrl: './ged.component.html',
  styleUrls: ['./ged.component.scss']
})
export class GEDComponent implements OnInit {

  @Input() selectedArticle;

  columns = [
    {
      prop: 'fileName',
      label: 'Nome du fichier',
      cell: (element: Ged) => `${element.fileName}`,
    },
    {
      prop: 'libelle',
      label: 'Designation',
      cell: (element: Ged) => `${element.libelle}`,
    },
    {
      prop: 'observation',
      label: 'Observation',
      cell: (element: Ged) => {return element.observation ? `${element.observation}` : '-'},
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
  GedForm: FormGroup;
  action: ACTIONS = ACTIONS.CREATE;
  fileName: string = '';
  defaultPageSize = 10;
  public resultsLength: any = 0;
  fileSelected;
  imageUrl;
  constructor(private _GedService: GedService,
    public _sharedService: SharedService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this._sharedService.tabChange$.subscribe(res=> {
      if(res == 3 && this.selectedArticle){
        this.loadData({pageIndex: 0, pageSize: this.defaultPageSize});
      }
    })
    this.GedForm = new FormGroup({
      'id': new FormControl(),
      'fileName': new FormControl(null, Validators.required),
      'libelle': new FormControl(null, Validators.required),
      'observation': new FormControl(null),
      // 'file': new FormControl(null, Validators.required),
    })
  }

  onTableChanges(tableChanges) {
    console.log('model change onTablechange : ', tableChanges);
    const { paginator, filters, sort } = (tableChanges);
    this.defaultPageSize = paginator.pageSize;
    this.loadData(paginator, filters, sort);
  }

  loadData(paginator, filters?, sort?) {
    this._GedService.getAllGeDs$Response({
      page: paginator.pageIndex,
      size: paginator.pageSize,
      sort: sort ? [sort] : null,
      filters: filters,
      id: this.selectedArticle.id
    }).subscribe(res => {
      this.resultsLength = Number(res.headers.get('X-Total-Count'))
      this.dataSource = res.body;
    })
  }

  clearFields() {
    this.GedForm.reset();
    this.fileSelected = null;
    this.imageUrl = null;
    this.action = ACTIONS.CREATE
  }

  onSubmit() {
    if(this.selectedArticle){
      if (this.action == ACTIONS.CREATE) {
        this.createGed();
      } else {
        this.updateGed();
      }
    }
  }

  createGed() {
    let formData = new FormData()
    formData.append('file', this.fileSelected);
    formData.append("ged", JSON.stringify({...this.GedForm.value, article: this.selectedArticle}))
    
    // formData.append('fileName', this.GedForm.get('fileName').value);
    // formData.append('libelle', this.GedForm.get('libelle').value);
    // formData.append('observation', this.GedForm.get('observation').value);
    // formData.append('article', new Blob([JSON.stringify(this.selectedArticle)], { type: 'application/json' }));

    this._GedService.addGed(formData).subscribe(res => {
      console.log('res : ', res);
      this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize });
      this.toastr.success('Ged ajouté avec succès', '', { toastClass: 'toastr-success' });
      this.clearFields();
    }, err => {
      this.toastr.error('Erreur', '', { toastClass: 'toastr-error' });
    })
  }

  updateGed() {
    this._GedService.updateGed(this.GedForm.value).subscribe(res => {
      this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize });
      this.toastr.success('Ged modifié avec succès', '', { toastClass: 'toastr-success' });
      this.clearFields();
    }, err => {
      this.toastr.error('Erreur', '', { toastClass: 'toastr-error' });
    })
  }

  onActionClicked(event) {
    if (event.action.name == ACTIONS.DELETE) {
      this._GedService.deleteGed(event.data.id).subscribe(res => {
        this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize });
        this.toastr.success('Ged supprimé avec succès', '', { toastClass: 'toastr-success' });
        this.clearFields();
      }, err => {
        this.toastr.error('Erreur', '', { toastClass: 'toastr-error' });
      })
    } else {
      // this.GedForm.setValue(event.data)
      this.imageUrl = environment.URL_API+"/"+event.data.fileNameINDataBsae
      // this.action = ACTIONS.UPDATE;
    }
  }

  public fileOver(event){
    console.log(event);
  }
 
  public fileLeave(event){
    console.log(event);
  }

  public fileRemove(){
    // this.GedForm.get('file').reset();
    this.fileSelected = null;
    this.imageUrl = null;
  }

  onFileSelected(file) {
    this.GedForm.get('fileName').setValue(file.target.files.item(0).name)
    this.fileSelected = file.target.files.item(0)
    // this.GedForm.get('file').setValue(file.target.files.item(0));

    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileSelected);
  }

}
