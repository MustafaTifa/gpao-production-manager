import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { combineLatest } from 'rxjs';
import { Article } from 'src/api-v2/article/models';
import { ArticleService } from 'src/api-v2/article/services/article-management.service';
import { ArticleNomenclature } from 'src/api-v2/nomenclature/models';
import { NomenclatureService } from 'src/api-v2/nomenclature/services/nomenclature-management.service';
import { Nomenclature } from 'src/api-v2/nomenclature/models';
import { DeleteComponentComponent } from 'src/app/shared/delete-component/delete-component.component';
import { StockCheckDialogComponent } from './stock-check-dialog/stock-check-dialog.component';
import { ACTIONS } from 'src/app/shared/enum/Actions.enum';
import { TypeArticle } from 'src/app/shared/enum/TypeArticle.enum';
import { MultiselectTableComponent } from 'src/app/shared/multiselect-table/multiselect-table.component';
import { SharedService } from 'src/app/shared/shared.service';
import { Actions } from 'src/app/shared/table/table.component';
import pdfmake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfmake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-nomenclature',
  templateUrl: './nomenclature.component.html',
  styleUrls: ['./nomenclature.component.scss']
})
export class NomenclatureComponent implements OnInit {

  @Input() selectedArticle;
  nomenclature: Nomenclature;
  columns = [
    {
      prop: 'pos',
      label: 'Position',
      cell: (element: ArticleNomenclature) => `${element.pos}`,
    },
    {
      prop: 'identifiant',
      label: this.getNameColumn('Article'),
      cell: (element: ArticleNomenclature) => `${element.article.identifiant} - ${element.article.libelleFR}`,
    },
    {
      prop: 'quantity',
      label: this.getNameColumn('poids'),
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
  disablePrint: boolean = true;
  displayedColumns = [...this.columns.map(c => c.prop), 'action'];
  nomenclatureForm: FormGroup;
  action: ACTIONS = ACTIONS.CREATE;
  defaultPageSize = 10;
  public resultsLength: any = 0;

  constructor(private _articleService: ArticleService,
    private _nomenclatureService: NomenclatureService,
    public _sharedService: SharedService,
    public dialog: MatDialog,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    const pipe = new DatePipe('en-US');
    this._sharedService.tabChange$.subscribe(res => {
      if (res == 1 && this.selectedArticle) {
        this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize });
      }
    })
    this.columns = this.columns.map(col => {
      if (col.prop == 'quantity') {
        return {
          ...col,
          label: this.selectedArticle?.type == 'Matiere' ? 'Poids' : 'Quantité'
        }

      }
      return col
    })
    this.nomenclatureForm = new FormGroup({
      'id': new FormControl(),
      'observation': new FormControl(null),
      'article': new FormControl({}, Validators.required),
      'pos': new FormControl(null, Validators.required),
      'quantity': new FormControl(null, [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]),
      'version': new FormControl({ value: null, disabled: true }),
      'lastModified': new FormControl({ value: pipe.transform(null, 'MM/dd/yyyy'), disabled: true }),
    })

  }

  onTableChanges(tableChanges) {
    const { paginator, filters, sort } = (tableChanges);
    this.defaultPageSize = paginator.pageSize;
    this.loadData(paginator, filters, sort);
  }

  loadData(paginator, filters?, sort?) {
    combineLatest(this._nomenclatureService.getAllArticleNomenclatures$Response({
      size: paginator.pageSize,
      page: paginator.pageIndex,
      sort: sort ? [sort] : null,
      id: this.selectedArticle?.id
    }), this._nomenclatureService.getAllNomenclatures({
      size: paginator.pageSize,
      page: paginator.pageIndex,
      sort: sort ? [sort] : null,
      id: this.selectedArticle?.id
    })).subscribe(([ass, nomenclature]) => {
      // this.resultsLength = Number(res.headers.get('X-Total-Count'))
      this.dataSource = ass.body;
      this.nomenclature = nomenclature;
      this.disablePrint = this.dataSource.length < 0 ? true : false;
      // if(this.dataSource){
      //   this.action = ACTIONS.UPDATE
      //   delete this.dataSource.createDate
      //   delete this.dataSource.articleNomenclatures;
      //   this.nomenclatureForm.setValue({...this.dataSource, lastModified: this._sharedService.fromJsonDate(this.dataSource.lastModified)})
      // } else {
      //   this.action = ACTIONS.CREATE
      // }

    }, err => {
      this.toastr.error(err?.error?.message, 'Erreur', { toastClass: 'toastr-error' });
    })
  }

  clearFields() {
    this.nomenclatureForm.reset();
    this.action = ACTIONS.CREATE
  }

  onSubmit() {
    console.log('onSubmit : ', this.nomenclatureForm.value);
    if (this.selectedArticle) {
      if (!this.nomenclature) {
        this.toastr.error(`Nomenclature n'existe pas sur cet article`, 'Erreur', { toastClass: 'toastr-error' });
        return;
      }
      let dataTosSend = {
        ...this.nomenclatureForm.value,
        article: this.nomenclatureForm.get('article')?.value,
        nomenclature: this.nomenclature
      }
      if (this.action == ACTIONS.CREATE) {
        this.createNomencloture(dataTosSend);
      } else {
        this.updateNomencloture(dataTosSend);
      }
    }
  }

  createNomencloture(dataTosSend) {

    console.log('nomenclatureForm : ', dataTosSend);
    this._nomenclatureService.addArticleNomenclature(dataTosSend).subscribe(res => {
      this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize });
      this.toastr.success('Nomencloture ajouté avec succès', '', { toastClass: 'toastr-success' });
      this.clearFields();
    }, err => {
      console.log('err : ', err);

      this.toastr.error(err?.error?.message, 'Erreur', { toastClass: 'toastr-error' });
    })
  }

  updateNomencloture(dataTosSend) {
    this._nomenclatureService.updateNomenclature$Response(dataTosSend).subscribe(res => {
      console.log('res : ', res);
      this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize });
      this.toastr.success('Nomencloture modifié avec succès', '', { toastClass: 'toastr-success' });
      this.clearFields();
    }, err => {
      this.toastr.error(err?.error?.message, 'Erreur', { toastClass: 'toastr-error' });
    })
  }

  onActionClicked(event) {
    console.log('eveeeeent : ', event);
    if (event.action.name == ACTIONS.DELETE) {
      const dialogRef = this.dialog.open(DeleteComponentComponent, {
        data: {
          title: 'Êtes-vous certain de vouloir supprimer cet Article ?',
          description: `Article à supprimer: ${event.data.article.identifiant} - ${event.data.article.libelleFR}`,
        },
      });
      dialogRef.afterClosed().subscribe((data) => {
        if (data) {
          this._nomenclatureService.deleteArticleNomenclature(event.data.id).subscribe(res => {
            this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize });
            this.toastr.success('Article supprimé avec succès', '', { toastClass: 'toastr-success' });
            this.clearFields();
          }, err => {
            this.toastr.error(err?.error?.message, 'Erreur', { toastClass: 'toastr-error' });
          })
        }
      });
    } else {
      delete event.data.createDate
      // let art = [...event.data.article]
      console.log('this.articleFrom : ', event.data.article);
      this.nomenclatureForm.setValue({
        id: event.data.id,
        article: event.data.article,
        version: event.data.version,
        quantity: event.data.quantity,
        pos: event.data.pos,
        observation: event.data.observation,
        lastModified: this._sharedService.fromJsonDate(event.data.lastModified)
      })
      this.action = ACTIONS.UPDATE;
    }
  }

  showArticles() {
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
              article.id != this.selectedArticle.id &&
              (this.selectedArticle.nature == 'Piece_Unitaire' ? (article.nature == 'Matiere') : (article.nature == 'Piece_Unitaire' || article.nature == 'Article')))
              .map(article =>
              ({
                ...article,
                typeArticle: TypeArticle.CHILD,
                checked: this.nomenclatureForm.get('article')?.value?.length ? this.nomenclatureForm.get('article')?.value?.find(item => item.id == article.id) ? true : false : false
              }))
            return { ...articles, body }
          })
        ),
        displayedColumns: [...this.articleColumns.map(c => c.prop)],
        columns: this.articleColumns
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      console.log('this.selection : ', data);
      if (data)
        this.nomenclatureForm.get('article').setValue(data)
      //this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize });
    });
  }



  disableInput(event: Event): void {
    event.preventDefault();
  }

  displayFn(object): string {
    console.log('object ggg : ', object);
    if (object?.identifiant || object?.libelleFR) {
      return `${object.identifiant} - ${object.libelleFR}`
    } else {
      return ''
    }
  }

  getNameColumn(title) {
    if (title == 'Article') {
      return this.selectedArticle?.type == 'Piece_Unitaire' ? 'Matiére' : 'Article'
    } else {
      return this.selectedArticle?.type == 'Piece_Unitaire' ? 'Poids' : 'Quantité'
    }
  }

  verifierStock() {
    this.dialog.open(StockCheckDialogComponent, {
      data: { articles: this.dataSource },
      width: '750px'
    });
  }

  printNomenclature() {
    const docDefinition = {

      content: [
        { text: `Document Nomenclature ${this.selectedArticle?.identifiant} - ${this.selectedArticle?.libelleFR}`, style: 'header', alignment: 'center' },
        {
          columns: [
            { width: '*', text: '' },
            {
              width: 'auto',
              table: {
                body: [
                  [
                    { text: "Identifiant", style: 'tableHeader' },
                    { text: "Désignation", style: 'tableHeader' },
                    { text: "Liste des engins", style: 'tableHeader' },
                    { text: "N° Dessin", style: 'tableHeader' }
                  ],
                  [
                    { text: `${this.selectedArticle?.identifiant}`, style: 'tableCell', alignment: 'center' },
                    { text: `${this.selectedArticle?.libelleFR}`, style: 'tableCell', alignment: 'center' },
                    {
                      ul: [...this.selectedArticle?.engins.map(engin => {
                        return `${engin.codeEngin} - ${engin.libelle}`
                      })]
                    },
                    { text: this.selectedArticle?.numberDessin ? `${this.selectedArticle?.numberDessin}` : '-', style: 'tableCell', alignment: 'center' },
                  ],
                  [
                    {
                      colSpan: 4,
                      style: "tableExample",
                      table: {
                        widths: ['*', '*', '*'],
                        body: [
                          [
                            { text: "Position", style: 'tableHeader' },
                            { text: "Article", style: 'tableHeader' },
                            { text: "Quantité", style: 'tableHeader' },
                          ],
                          ...this.dataSource.map(nomenclature => {
                            return [
                              { text: `${nomenclature.pos}`, style: 'tableCell', alignment: 'center' },
                              { text: `${nomenclature.article.identifiant} - ${nomenclature.article.libelleFR}`, style: 'tableCell', alignment: 'center' },
                              { text: `${nomenclature.quantity}`, style: 'tableCell', alignment: 'center' },
                            ]
                          })
                        ],

                      }
                    },
                    {}, {}, {}
                  ],

                ]
              }
            },
            { width: '*', text: '' },
          ]
        }
      ],

      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 35]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black',
        },
        tableCell: {
          fontSize: 11,
          margin: [10, 5, 10, 5]
        },
        // tableExample: {
        //   background : 'black'
        // }
      }
    };

    pdfmake.createPdf(docDefinition).download("Nomenclature.pdf");
  }

}
