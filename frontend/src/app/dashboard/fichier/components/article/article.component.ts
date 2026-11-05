import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { Article } from 'src/api-v2/article/models/article';
import { ArticleService } from 'src/api-v2/article/services/article-management.service';
import { Engin } from 'src/api-v2/engin/models';
import { EnginService } from 'src/api-v2/engin/services/engin-management.service';
import { Groupe } from 'src/api-v2/group/models';
import { GroupControllerService } from 'src/api-v2/group/services';
import { SousGroupe } from 'src/api-v2/sous-group/models';
import { SousGroupControllerService } from 'src/api-v2/sous-group/services';
import { Type } from 'src/api-v2/type/models';
import { TypeService } from 'src/api-v2/type/services/type-management.service';
import { DeleteComponentComponent } from 'src/app/shared/delete-component/delete-component.component';
import { ACTIONS } from 'src/app/shared/enum/Actions.enum';
import { TypeArticle } from 'src/app/shared/enum/TypeArticle.enum';
import { MultiselectTableComponent } from 'src/app/shared/multiselect-table/multiselect-table.component';
import { SharedService } from 'src/app/shared/shared.service';
import { Actions } from 'src/app/shared/table/table.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  columns = [
    {
      prop: 'identifiant',
      label: 'Identifiant',
      cell: (element: Article) => `${element.identifiant}`,
      filterable: true,
      filterOptions: {
        type: 'input',
        mode: 'cr',
        prop: 'identifiant'
      }
    },
    {
      prop: 'identifiantSomatel',
      label: 'Identifiant Somatel',
      cell: (element: Article) => `${element.identifiantSomatel ? element.identifiantSomatel : '-'}`,
      filterable: true,
      filterOptions: {
        type: 'input',
        mode: 'cr',
        prop: 'identifiantSomatel'
      }
    },
    {
      prop: 'libelleFR',
      label: 'Designation FR',
      cell: (element: Article) => `${element.libelleFR}`,
      filterable: true,
      sortable: true,
      filterOptions: {
        type: 'input',
        mode: 'cr',
        prop: 'libelleFR'
      }
    },
    // {
    //   prop: 'libelleEN',
    //   label: 'Designation EN',
    //   cell: (element: Article) => `${element.libelleEN}`,
    //   filterable: true,
    //   sortable: true,
    //   filterOptions: {
    //     type: 'input',
    //     mode: 'cr',
    //     prop: 'libelleEN'
    //   }
    // },
    // {
    //   prop: 'libelleGER',
    //   label: 'Designation GER',
    //   cell: (element: Article) => `${element.libelleGER}`,
    //   filterable: true,
    //   sortable: true,
    //   filterOptions: {
    //     type: 'input',
    //     mode: 'cr',
    //     prop: 'libelleGER'
    //   }
    // },
    // {
    //   prop: 'fournisseurREF',
    //   label: 'Ref Fournisseur',
    //   cell: (element: Article) => `${element.fournisseurREF}`,
    //   filterable: true,
    //   sortable: true,
    //   filterOptions: {
    //     type: 'input',
    //     mode: 'cr',
    //     prop: 'fournisseurREF'
    //   }
    // },
    {
      prop: 'nature',
      label: 'Nature',
      cell: (element: Article) => `${element.nature}`,
      filterable: true,
      sortable: true,
      filterOptions: {
        type: 'input',
        mode: 'cr',
        prop: 'nature'
      }
    },
    {
      prop: 'type',
      label: 'Type',
      cell: (element: Article) => `${element.type.codeType} - ${element.type.libelle}`,
      filterable: true,
      sortable: true,
      filterOptions: {
        type: 'input',
        mode: 'cr',
        prop: 'type.codeType'
      }
    },
    {
      prop: 'groupe',
      label: 'Groupe',
      cell: (element: Article) => `${element.groupe?.codeGroup && element.groupe?.libelle ? element.groupe?.codeGroup +' - '+ element.groupe?.libelle : '-'}`,
      filterable: true,
      sortable: true,
      filterOptions: {
        type: 'input',
        mode: 'cr',
        prop: 'groupe.codeGroup'
      }
    },
    {
      prop: 'sousGroupe',
      label: 'Sous-groupe',
      cell: (element: Article) => `${element.sousGroupe?.codeSousGroup && element.sousGroupe?.libelle ? element.sousGroupe?.codeSousGroup +' - '+ element.sousGroupe?.libelle : '-'}`,
      filterable: true,
      sortable: true,
      filterOptions: {
        type: 'input',
        mode: 'cr',
        prop: 'sousGroupe.codeSousGroup'
      }
    }

  ];

  EnginColumns = [
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
    }
  ]

  actions: Actions[] = [
    {
      icon: 'delete',
      name: 'delete'
    }
  ]
  dataSource = null;
  displayedColumns = [...this.columns.map(c => c.prop), 'action'];
  natures = [
    {name: 'Article', value:'Article'},
    {name: 'Matière', value: 'Matiere'},
    {name: 'Pièce unitaire', value: 'Piece_Unitaire'},
  ]
  articleForm: FormGroup;
  action: ACTIONS = ACTIONS.CREATE;
  defaultPageSize = 10;
  public resultsLength: any = 0;
  groupeOptions: Observable<Groupe[]>;
  sousGroupeOptions: Observable<SousGroupe[]>;
  typeOptions: Observable<Type[]>;
  groupes: Groupe[] = []
  sousGroupes: SousGroupe[] = []
  types: Type[] = []
  nature: string = '';
  selectedArticle;
  hideNomenclature: boolean = true;
  constructor(private _articleService: ArticleService, 
    private _groupeService: GroupControllerService,
    private _sousGroupeService: SousGroupControllerService,
    private _typeService: TypeService,
    private _enginService: EnginService,
    public dialog: MatDialog,
    public _sharedService: SharedService,
    private toastr: ToastrService) { }
    
    ngOnInit(): void {
    const pipe = new DatePipe('en-US');
    this.loadData({pageIndex: 0, pageSize: this.defaultPageSize});
    this.articleForm = new FormGroup({
      'id': new FormControl(),
      'identifiant': new FormControl(null, Validators.required),
      'identifiantSomatel': new FormControl(null),
      'nature': new FormControl('Article', Validators.required),
      'libelleFR': new FormControl(null,Validators.required),
      'observation': new FormControl(null),
      'libelleEN': new FormControl(null),
      'libelleGER': new FormControl(null),
      'fournisseurREF': new FormControl(null),
      'groupe': new FormControl(null),
      'sousGroupe': new FormControl(null),
      'type': new FormControl(null,Validators.required),
      'engins': new FormControl([]),
      'numberDessin': new FormControl(null),
      'facteurTaux': new FormControl(0,Validators.required),
      'sortieUnit': new FormControl(null),
      'version': new FormControl({value: null,disabled: true}),
      'lastModified': new FormControl({value: pipe.transform(null, 'MM/dd/yyyy'),disabled: true}),
    })

    this.articleForm.get('nature').valueChanges.subscribe(val => {
      console.log('natureeeee : ',val);
      this.nature = val
    })

    combineLatest(this._groupeService.getAllGroups(),this._sousGroupeService.getAllGroups(),this._typeService.getAllTypes())
    .pipe(map(([_groups,_souGroups,_types]) => {
      this.groupes = _groups.map(groupe =>({id: groupe.id,codeGroup: groupe.codeGroup, libelle: groupe.libelle}))
      this.sousGroupes = _souGroups.map(sousGroupe =>({id: sousGroupe.id,codeSousGroup: sousGroupe.codeSousGroup, libelle: sousGroupe.libelle}))
      this.types = _types.map(type =>({id: type.id,codeType: type.codeType, libelle: type.libelle}))
    }))
    .subscribe(() => {
      this.groupeOptions = this.articleForm.get('groupe').valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : value?.codeGroupe;
          return name ? this._filter(name as string,'groupe') : this.groupes.slice();
        }),
      );
      this.groupeOptions.subscribe(ff => {
        return ff
      })
      this.sousGroupeOptions = this.articleForm.get('sousGroupe').valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : value?.codeSousGroup;
          return name ? this._filter(name as string,'sousGroupe') : this.sousGroupes.slice();
        }),
      );
      this.sousGroupeOptions.subscribe(ff => {
        return ff
      })
      this.typeOptions = this.articleForm.get('type').valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : value?.codeType;
          return name ? this._filter(name as string,'type') : this.types.slice();
        }),
      );
      this.typeOptions.subscribe(ff => {
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
    this._articleService.getAllArticles$Response({
      page: paginator.pageIndex,
      size: paginator.pageSize,
      sort: sort ? [sort] : null,
      filters: filters
    }).subscribe(res => {
      this.resultsLength = Number(res.headers.get('X-Total-Count'))
      this.dataSource = res.body;
    }, err => {
      console.log('err artcle: ',err);
      this.toastr.error(err?.error?.message,'Erreur', { toastClass: 'toastr-error' });
    })
  }

  clearFields() {
    this.articleForm.reset();
    this.action = ACTIONS.CREATE
    this.selectedArticle = null;
  }

  onSubmit() {
    console.log('onSubmit : ',this.articleForm.value);
    if (this.action == ACTIONS.CREATE) {
      this.createArticle();
    } else {
      this.updateArticle();
    }
  }

  createArticle() {
    this._articleService.addArticle(this.articleForm.value).subscribe(res => {
      this.loadData({pageIndex: 0, pageSize: this.defaultPageSize});
      this.toastr.success('Article ajouté avec succès','', { toastClass: 'toastr-success' });
      this.clearFields();
    }, err => {
      console.log('err : ',err);

      this.toastr.error(err?.error?.message,'Erreur', { toastClass: 'toastr-error' });
    })
  }

  updateArticle() {
    console.log('this.this.articleForm : ',this.articleForm.value,this.articleForm.get('groupe').value);
    this._articleService.updateArticle(this.articleForm.value).subscribe(res => {
      console.log('res : ', res);
      this.loadData({pageIndex: 0, pageSize: this.defaultPageSize});
      this.toastr.success('Article modifié avec succès','', { toastClass: 'toastr-success' });
      this.clearFields();
    },err => {
      this.toastr.error(err?.error?.message,'Erreur', { toastClass: 'toastr-error' });
    })
  }

  onActionClicked(event) {
    if (event.action.name == ACTIONS.DELETE) {
      const dialogRef = this.dialog.open(DeleteComponentComponent, {
        data: {
          title: 'Êtes-vous certain de vouloir supprimer cet Article ?',
          description: `Article à supprimer: ${event.data.identifiant} - ${event.data.libelleFR}`,
        },
      });
      dialogRef.afterClosed().subscribe((data) => {
        if(data){
          this._articleService.deleteArticle(event.data.id).subscribe(res => {
            this.loadData({pageIndex: 0, pageSize: this.defaultPageSize});
            this.toastr.success('Article supprimé avec succès','', { toastClass: 'toastr-success' });
            this.clearFields();
          },err => {
            this.toastr.error(err?.error?.message,'Erreur', { toastClass: 'toastr-error' });
          })
        }
      });
    } else {
      delete event.data.createDate
      delete event.data.articleNomenclatures;
      delete event.data.articleGammes;
      delete event.data.typeArticle
      delete event.data.gammeId
      delete event.data.action
      console.log('evee : ',event.data.engins);
      this.articleForm.patchValue({...event.data, lastModified: this._sharedService.fromJsonDate(event.data.lastModified), engins: event.data.engins})
      this.selectedArticle = {...this.articleForm.value, typeArticle: TypeArticle.PARENT}
      this.action = ACTIONS.UPDATE;
      this.hideNomenclature = this.selectedArticle.nature != 'Matiere';
    }
  }

  displayFn(type: any,object): string {
    switch (type) {
      case 'sousGroupe':
        return object && object.codeSousGroup ? `${object.codeSousGroup} - ${object.libelle}` : '';
      case 'type':
        return object && object.codeType ?  `${object.codeType} - ${object.libelle}` : '';
      case 'engin':
        if(object?.length > 0){
          return object?.map(obj => (`${obj.codeEngin} - ${obj.libelle}`)).toString()
        } else {
          return ''
        }
      default:
        return object && object.codeGroup ? `${object.codeGroup} - ${object.libelle}` : '';
    }
  }

  private _filter(codeGroup: string, type: string): any[] {
    const filterValue = codeGroup.toLowerCase();
    switch (type) {
      case 'sousGroupe':
        return this.sousGroupes.filter(option => option.codeSousGroup.toLowerCase().includes(filterValue));
      case 'type':
        return this.types.filter(option => option.codeType.toLowerCase().includes(filterValue));
      default:
        return this.groupes.filter(option => option.codeGroup.toLowerCase().includes(filterValue));
    }
  }

  showEngins(){
    console.log('enggg : ',this.articleForm.get('engins')?.value);
    const dialogRef = this.dialog.open(MultiselectTableComponent, {
      data: {
        title: 'Liste des Engins',
        articleId: 1,
        multiSelect: true,
        width: '850px',
        height: '750px',
        // model: this.articleForm.get('engins'),
        getData: (data) => this._enginService.getAllEngins$Response({
          page: data.page.pageIndex,
          size: data.size.pageSize,
          sort: data.sort ? [data.sort] : null,
          filters: data.filters
        }).pipe(
          map(engins => {
            let body = engins.body.map(engin => 
              ({
                ...engin,
                checked: this.articleForm.get('engins')?.value?.length ? this.articleForm.get('engins').value.find(item=> item.id == engin.id) ? true : false : false
              }))
            return {...engins,body}
          })
        ),
        displayedColumns: ['select',...this.EnginColumns.map(c => c.prop)],
        columns: this.EnginColumns
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      console.log('this.selection : ',data);
      if(data)
      this.articleForm.get('engins').setValue(data)
      this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize });
    });
  }

  disableInput(event: Event): void {
    event.preventDefault();
  }

  tabChanges(event){
    console.log('eventt : ',this.selectedArticle);
    this._sharedService.tabChange$.next(event);
  }

}
