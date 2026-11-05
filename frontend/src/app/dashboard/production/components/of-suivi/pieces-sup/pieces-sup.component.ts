import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { combineLatest } from 'rxjs';
import { Article } from 'src/api-v2/article/models';
import { ArticleService } from 'src/api-v2/article/services/article-management.service';
import { ArticleNomenclature } from 'src/api-v2/nomenclature/models';
import { NomenclatureService } from 'src/api-v2/nomenclature/services/nomenclature-management.service';
import { Nomenclature } from 'src/api-v2/nomenclature/models';
import { DeleteComponentComponent } from 'src/app/shared/delete-component/delete-component.component';
import { ACTIONS } from 'src/app/shared/enum/Actions.enum';
import { TypeArticle } from 'src/app/shared/enum/TypeArticle.enum';
import { MultiselectTableComponent } from 'src/app/shared/multiselect-table/multiselect-table.component';
import { SharedService } from 'src/app/shared/shared.service';
import { Actions } from 'src/app/shared/table/table.component';
import { OfSuiviService } from 'src/api-v2/of-suivi/services/of-suivi-management.service';
import { NomenclatureOf } from 'src/api-v2/of-suivi/models/nomenclature-of';


@Component({
  selector: 'app-pieces-sup',
  templateUrl: './pieces-sup.component.html',
  styleUrls: ['./pieces-sup.component.scss']
})
export class PiecesSupComponent implements OnInit {

  columns = [
    {
      prop: 'pos',
      label: 'Position',
      cell: (element: ArticleNomenclature) => `${element.pos}`,
    },
    {
      prop: 'identifiant',
      label: 'Article',
      cell: (element: ArticleNomenclature) => `${element.article.identifiant} - ${element.article.libelleFR}`,
    },
    {
      prop: 'quantity',
      label: 'Poids',
      cell: (element: ArticleNomenclature) => `${element.quantity}`,
    },
  ];

  articleColumns = [
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
      cell: (element: Article) => `${element.identifiantSomatel}`,
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
    }
  ]

  actions: Actions[] = [
    {
      icon: 'delete',
      name: 'delete'
    }
  ]
  dataSource = null;
  displayedColumns = [...this.columns.map(c => c.prop)];
  nomenclatureForm: FormGroup;
  action: ACTIONS = ACTIONS.CREATE;
  defaultPageSize = 10;
  public resultsLength: any = 0;

  constructor(private _articleService: ArticleService,
    private _ofSuiviService: OfSuiviService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PiecesSupComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      ofId: number
      article: Article
    },
    private toastr: ToastrService) { }
    
    ngOnInit(): void {
    const pipe = new DatePipe('en-US');
    this.loadData({pageIndex: 0, pageSize: this.defaultPageSize});
    this.nomenclatureForm = new FormGroup({
      'id': new FormControl(),
      'article': new FormControl({},Validators.required),
      'pos': new FormControl(null, Validators.required),
      'quantity': new FormControl(null,Validators.required),
    })

  }

  onTableChanges(tableChanges) {
    const {paginator, filters, sort} = (tableChanges);
    this.defaultPageSize = paginator.pageSize;
    this.loadData(paginator, filters, sort);
  }

  loadData(paginator, filters?, sort?) {
    this._ofSuiviService.getAllNomenclactureOFs({
      size: paginator.pageSize,
      page: paginator.pageIndex,
      idOF: this.data.ofId,
    }).subscribe(ofs => {
      this.dataSource = ofs;
    }, err => {
      this.toastr.error(err?.error?.message,'Erreur', { toastClass: 'toastr-error' });
    })
  }

  clearFields() {
    this.nomenclatureForm.reset();
    this.action = ACTIONS.CREATE
  }

  onSubmit() {
    console.log('onSubmit : ',this.nomenclatureForm.value);
      let dataTosSend = {
        ...this.nomenclatureForm.value,
        article: this.nomenclatureForm.get('article')?.value,
      }
      if (this.action == ACTIONS.CREATE) {
        this.createNomencloture(dataTosSend);
      } else {
        this.updateNomencloture(dataTosSend);
      }
  }

  createNomencloture(data) {
    
    const dataToSend: NomenclatureOf = {
      ...data,
      idOf: this.data.ofId
    }
    console.log('nomenclatureForm : ',dataToSend);
    this._ofSuiviService.addNomenclatureOf({body: dataToSend}).subscribe(res => {
      this.loadData({pageIndex: 0, pageSize: this.defaultPageSize});
      this.toastr.success('Nomencloture ajouté avec succès','', { toastClass: 'toastr-success' });
      this.clearFields();
    }, err => {
      console.log('err : ',err);

      this.toastr.error(err?.error?.message,'Erreur', { toastClass: 'toastr-error' });
    })
  }

  updateNomencloture(dataTosSend) {
    this._ofSuiviService.updateNomenclatureOf({body: dataTosSend}).subscribe(res => {
      console.log('res : ', res);
      this.loadData({pageIndex: 0, pageSize: this.defaultPageSize});
      this.toastr.success('Nomencloture modifié avec succès','', { toastClass: 'toastr-success' });
      this.clearFields();
    },err => {
      this.toastr.error(err?.error?.message,'Erreur', { toastClass: 'toastr-error' });
    })
  }

  onActionClicked(event) {
    console.log('eveeeeent : ',event);
    if (event.action.name == ACTIONS.DELETE) {
      // const dialogRef = this.dialog.open(DeleteComponentComponent, {
      //   data: {
      //     title: 'Êtes-vous certain de vouloir supprimer cet Article ?',
      //     description: `Article à supprimer: ${event.data.article.identifiant} - ${event.data.article.libelleFR}`,
      //   },
      // });
      // dialogRef.afterClosed().subscribe((data) => {
      //   if(data){
      //     this._ofSuiviService.deleteArticleNomenclature(event.data.id).subscribe(res => {
      //       this.loadData({pageIndex: 0, pageSize: this.defaultPageSize});
      //       this.toastr.success('Article supprimé avec succès','', { toastClass: 'toastr-success' });
      //       this.clearFields();
      //     },err => {
      //       this.toastr.error(err?.error?.message,'Erreur', { toastClass: 'toastr-error' });
      //     })
      //   }
      // });
    } else {
      delete event.data.createDate
      // let art = [...event.data.article]
      console.log('this.articleFrom : ',event.data.article);
      this.nomenclatureForm.setValue({
        id: event.data.id,
        article: event.data.article,
        quantity: event.data.quantity,
        pos: event.data.pos,
      })
      this.action = ACTIONS.UPDATE;
    }
  }

  showArticles(){
    const dialogRef = this.dialog.open(MultiselectTableComponent, {
      data: {
        title: 'Liste des articles',
        articleId: 1,
        singleSelect: true,
        multiSelect: false,
        width: '850px',
        height: '750px',
        // model: this.nomenclatureForm.get('article'),
        getData: (data) => this._articleService.getAllArticles$Response({
          page: data.page.pageIndex,
          size: data.size.pageSize,
          sort: data.sort ? [data.sort] : null,
          filters: data.filters
        }).pipe(
          map(articles => {
            let body = articles.body.filter(article => 
              article.id != this.data.article.id &&
              (this.data.article.nature == 'Piece_Unitaire' ?  (article.nature == 'Matiere') : (article.nature == 'Piece_Unitaire' || article.nature == 'Article')))
              .map(article => 
              ({
                ...article,
                typeArticle: TypeArticle.CHILD,
                checked: this.nomenclatureForm.get('article')?.value?.length ? this.nomenclatureForm.get('article')?.value?.find(item=> item.id == article.id) ? true : false : false
              }))
            return {...articles,body}
          })
        ),
        displayedColumns: [...this.articleColumns.map(c => c.prop)],
        columns: this.articleColumns
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      console.log('this.selection : ',data);
      if(data)
      this.nomenclatureForm.get('article').setValue(data)
      //this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize });
    });
  }

  

  disableInput(event: Event): void {
    event.preventDefault();
  }

  displayFn(object): string {
    console.log('object ggg : ',object);
    if(object?.identifiant || object?.libelleFR){
      return `${object.identifiant} - ${object.libelleFR}`
    } else {
      return ''
    }
  }

}

