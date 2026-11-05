import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { Article } from 'src/api-v2/article/models';
import { ArticleService } from 'src/api-v2/article/services/article-management.service';
import { NomenclatureService } from 'src/api-v2/nomenclature/services/nomenclature-management.service';
import { OfIntern } from 'src/api-v2/of-intern/models';
import { OfService } from 'src/api-v2/of-intern/services/of-management.service';
import { DeleteComponentComponent } from 'src/app/shared/delete-component/delete-component.component';
import { ACTIONS } from 'src/app/shared/enum/Actions.enum';
import { MultiselectTableComponent } from 'src/app/shared/multiselect-table/multiselect-table.component';
import { SharedService } from 'src/app/shared/shared.service';
import { Actions } from 'src/app/shared/table/table.component';
import { GammeService } from 'src/api-v2/gamme/services/gamme-management.service';
import pdfmake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfmake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-of-intern',
  templateUrl: './of-intern.component.html',
  styleUrls: ['./of-intern.component.scss']
})
export class OfInternComponent implements OnInit {

  columns = [
    {
      prop: 'numberOF',
      label: 'N° OF',
      cell: (element: OfIntern) => `${element.numberOF}`,
    },
    {
      prop: 'date',
      label: 'Date',
      cell: (element: OfIntern) => `${this._sharedService.toDate(element.date)}`,
    },
    {
      prop: 'article',
      label: 'Article',
      cell: (element: OfIntern) => `${element.article.identifiantSomatel} - ${element.article.libelleFR}`,
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
  displayedColumns = [...this.columns.map(c => c.prop), 'action'];
  ofInternForm: FormGroup;
  action: ACTIONS = ACTIONS.CREATE;
  defaultPageSize = 10;
  public resultsLength: any = 0;
  disablePrint: boolean = true;

  constructor(private _ofService: OfService,
    public _sharedService: SharedService,
    public _articleService: ArticleService,
    public dialog: MatDialog,
    private _nomenclatureService: NomenclatureService,
    private _GammeService: GammeService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    const pipe = new DatePipe('en-US');

    this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize });
    this.ofInternForm = new FormGroup({
      'id': new FormControl(),
      'numberOF': new FormControl(null, Validators.required),
      'article': new FormControl({}, Validators.required),
      'quantity': new FormControl(null, Validators.required),
      'delai': new FormControl(null, Validators.required),
      'date': new FormControl(null, Validators.required),
      'bonDeCommande': new FormControl(null),
      'projectOf': new FormControl(null),
      'rc': new FormControl(null),
      'observation': new FormControl(null),
      // 'version': new FormControl({ value: null, disabled: true }),
      // 'lastModified': new FormControl({ value: pipe.transform(null, 'MM/dd/yyyy'), disabled: true }),
    })

  }

  onTableChanges(tableChanges) {
    const { paginator, filters, sort } = (tableChanges);
    this.defaultPageSize = paginator.pageSize;
    this.loadData(paginator, filters, sort);
  }

  loadData(paginator, filters?, sort?) {
    this._ofService.getAllOfInterns$Response({
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
    this.ofInternForm.reset();
    this.disablePrint = true;
    this.action = ACTIONS.CREATE
  }

  onSubmit() {
    if (this.action == ACTIONS.CREATE) {
      this.createOFIntern(this.ofInternForm.value);
    } else {
      this.updateOFIntern(this.ofInternForm.value);
    }
  }

  createOFIntern(dataTosSend) {

    console.log('nomenclatureForm : ', dataTosSend);
    this._ofService.addOfIntern(dataTosSend).subscribe(res => {
      this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize });
      this.toastr.success('OF Intern ajouté avec succès', '', { toastClass: 'toastr-success' });
      this.clearFields();
    }, err => {
      console.log('err : ', err);

      this.toastr.error(err?.error?.message, 'Erreur', { toastClass: 'toastr-error' });
    })
  }

  updateOFIntern(dataTosSend) {
    this._ofService.updateOfIntern(dataTosSend).subscribe(res => {
      console.log('res : ', res);
      this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize });
      this.toastr.success('OFIntern modifié avec succès', '', { toastClass: 'toastr-success' });
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
          title: 'Êtes-vous certain de vouloir supprimer ce OF ?',
          description: `OF à supprimer: ${event.data.article.identifiant} - ${event.data.article.libelleFR}`,
        },
      });
      dialogRef.afterClosed().subscribe((data) => {
        if (data) {
          this._ofService.deleteOfIntern(event.data.id).subscribe(res => {
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
      this.ofInternForm.setValue(event.data)
      this.disablePrint = false;
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
        // model: this.ofInternForm.get('article'),
        getData: (data) => this._articleService.getAllArticles$Response({
          page: data.page.pageIndex,
          size: data.size.pageSize,
          sort: data.sort ? [data.sort] : null,
          filters: data.filters
        }).pipe(
          map(articles => {
            let body = articles.body.map(article =>
            ({
              ...article,
              checked: this.ofInternForm.get('article')?.value?.length ? this.ofInternForm.get('article')?.value?.find(item => item.id == article.id) ? true : false : false
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
        this.ofInternForm.get('article').setValue(data)
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

  printGamme(){
    if (this.ofInternForm.get('article').value?.id) {
      this._GammeService.getAllGammes({
        page: 0,
        size: 10000,
        id: this.ofInternForm.get('article').value?.id
      }).subscribe(res => {
        this.createGamme(res)
      })
    }
  }

  print(type) {
    if (this.ofInternForm.get('article').value?.id) {
      this._nomenclatureService.getAllArticleNomenclatures({
        page: 0,
        size: 10000,
        id: this.ofInternForm.get('article').value?.id
      }).subscribe(res => {
        if(type == 'cc-64'){
          this.createCC64(res, this.ofInternForm.get('quantity').value)
        } else {
          this.createOF(res)
        }

      })
    } else {
      this.toastr.error("Article ID n'existe pas !!", 'Erreur', { toastClass: 'toastr-error' });
    }
  }

  createCC64(articles, qteGlobal) {
    const docDefinition = {

      content: [
        { text: 'Document CC-64', style: 'header', alignment: 'center' },
        {
          columns: [
            { width: '*', text: '' },
            {
              style: "tableExample",
              width: 'auto',
              table: {
                body: [
                  [
                    { text: "Identifiant", style: 'tableHeader' },
                    { text: "Article", style: 'tableHeader' },
                    { text: "Qte", style: 'tableHeader' },
                    { text: "Qte globale", style: 'tableHeader' },
                    { text: "Totale", style: 'tableHeader' }
                  ],
                  ...articles.map(article => {
                    return [{ text: `${article.article?.identifiantSomatel}`, style: 'tableCell', alignment: 'center' },
                    { text: `${article.article?.libelleFR}`, style: 'tableCell', alignment: 'center' },
                    { text: `${article.quantity}`, style: 'tableCell', alignment: 'center' },
                    { text: `${qteGlobal}`, style: 'tableCell', alignment: 'center' },
                    { text: `${parseFloat(article.quantity) * parseFloat(qteGlobal)}`, style: 'tableCell', alignment: 'center' }
                    ]
                  })

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
        }
      }
    };

    pdfmake.createPdf(docDefinition).download("CC-64.pdf");
  }

  createOF(articles) {
    const docDefinition = {

      content: [
        { text: `Document OF intern N° ${this.ofInternForm.get('numberOF')?.value}`, style: 'header', alignment: 'center' },
        {
          columns: [
            { width: '*', text: '' },
            {
              width: 'auto',
              table: {
                body: [
                  [
                    { text: "OF", style: 'tableHeader' },
                    { text: "Date", style: 'tableHeader' },
                    { text: "Délai", style: 'tableHeader' },
                    { text: "Bon de commande", style: 'tableHeader' }
                  ],
                  [
                    { text: `${this.ofInternForm.get('numberOF')?.value}`, style: 'tableCell', alignment: 'center' },
                    { text: `${this._sharedService.toDate(this.ofInternForm.get('date')?.value)}`, style: 'tableCell', alignment: 'center' },
                    { text: `${this.ofInternForm.get('delai')?.value}`, style: 'tableCell', alignment: 'center' },
                    { text: this.ofInternForm.get('bonDeCommande')?.value ? `${this.ofInternForm.get('bonDeCommande')?.value}` : '-', style: 'tableCell', alignment: 'center' },
                  ],
                  [
                    { text: "Identifiant", style: 'tableHeader' },
                    { text: "Désignation", style: 'tableHeader' },
                    { text: "Quantité", style: 'tableHeader' },
                    { text: "N° Dessin", style: 'tableHeader' }
                  ],
                  [
                    { text: `${this.ofInternForm.get('article')?.value?.identifiant}`, style: 'tableCell', alignment: 'center' },
                    { text: `${this.ofInternForm.get('article')?.value?.libelleFR}`, style: 'tableCell', alignment: 'center' },
                    { text: `${this.ofInternForm.get('quantity')?.value}`, style: 'tableCell', alignment: 'center' },
                    { text: this.ofInternForm.get('article')?.value?.numberDessin ? `${this.ofInternForm.get('article')?.value?.numberDessin}` : '-', style: 'tableCell', alignment: 'center' },
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
                          ...articles.map(nomenclature => {
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

    pdfmake.createPdf(docDefinition).download("OF-intern.pdf");
  }

  createGamme(articles) {
    const docDefinition = {

      content: [
        { text: `Document OF intern N° ${this.ofInternForm.get('numberOF')?.value}`, style: 'header', alignment: 'center' },
        {
          columns: [
            { width: '*', text: '' },
            {
              width: 'auto',
              table: {
                body: [
                  [
                    { text: "OF", style: 'tableHeader' },
                    { text: "Date", style: 'tableHeader' },
                    { text: "Délai", style: 'tableHeader' },
                    { text: "Bon de commande", style: 'tableHeader' }
                  ],
                  [
                    { text: `${this.ofInternForm.get('numberOF')?.value}`, style: 'tableCell', alignment: 'center' },
                    { text: `${this._sharedService.toDate(this.ofInternForm.get('date')?.value)}`, style: 'tableCell', alignment: 'center' },
                    { text: `${this.ofInternForm.get('delai')?.value}`, style: 'tableCell', alignment: 'center' },
                    { text: this.ofInternForm.get('bonDeCommande')?.value ? `${this.ofInternForm.get('bonDeCommande')?.value}` : '-', style: 'tableCell', alignment: 'center' },
                  ],
                  [
                    { text: "Identifiant", style: 'tableHeader' },
                    { text: "Désignation", style: 'tableHeader' },
                    { text: "Quantité", style: 'tableHeader' },
                    { text: "N° Dessin", style: 'tableHeader' }
                  ],
                  [
                    { text: `${this.ofInternForm.get('article')?.value?.identifiant}`, style: 'tableCell', alignment: 'center' },
                    { text: `${this.ofInternForm.get('article')?.value?.libelleFR}`, style: 'tableCell', alignment: 'center' },
                    { text: `${this.ofInternForm.get('quantity')?.value}`, style: 'tableCell', alignment: 'center' },
                    { text: this.ofInternForm.get('article')?.value?.numberDessin ? `${this.ofInternForm.get('article')?.value?.numberDessin}` : '-', style: 'tableCell', alignment: 'center' },
                  ],
                  [
                    {
                      colSpan: 4,
                      style: "tableExample",
                      table: {
                        body: [
                          [
                            { text: "POS", style: 'tableHeader' },
                            { text: "Opération", style: 'tableHeader' },
                            { text: "Temp d'exécution", style: 'tableHeader' },
                            { text: "Poste de travail", style: 'tableHeader' },
                            { text: "Articles", style: 'tableHeader' }
                          ],
                          ...articles.map(gamme => {
                            return [
                              { text: `${gamme.pos}`, style: 'tableCell', alignment: 'center' },
                              { text: `${gamme.operation}`, style: 'tableCell', alignment: 'center' },
                              { text: `${gamme.executionTime}`, style: 'tableCell', alignment: 'center' },
                              { text: `${gamme.workstation.codeWorkstation} - ${gamme.workstation.libelle}`, style: 'tableCell', alignment: 'center' },
                              {
                                ul: [...gamme?.articles.map(article => {
                                  return `${article.identifiant} - ${article.libelleFR}`
                                })]
                              },
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

    pdfmake.createPdf(docDefinition).download("OF-gamme.pdf");
  }

}
