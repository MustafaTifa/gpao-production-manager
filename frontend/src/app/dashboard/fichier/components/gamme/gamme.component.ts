import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, startWith } from 'rxjs';
import { Article } from 'src/api-v2/article/models';
import { ArticleService } from 'src/api-v2/article/services/article-management.service';
import { Gamme, Workstation } from 'src/api-v2/gamme/models';
import { GammeService } from 'src/api-v2/gamme/services/gamme-management.service';
import { WorkstationService } from 'src/api-v2/workstation/services/workstation-management.service';
import { DeleteComponentComponent } from 'src/app/shared/delete-component/delete-component.component';
import { ACTIONS } from 'src/app/shared/enum/Actions.enum';
import { TypeArticle } from 'src/app/shared/enum/TypeArticle.enum';
import { MultiselectTableComponent } from 'src/app/shared/multiselect-table/multiselect-table.component';
import { SharedService } from 'src/app/shared/shared.service';
import { Actions } from 'src/app/shared/table/table.component';
import pdfmake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfmake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-gamme',
  templateUrl: './gamme.component.html',
  styleUrls: ['./gamme.component.scss']
})
export class GammeComponent implements OnInit {

  @Input() selectedArticle;

  columns = [
    {
      prop: 'pos',
      label: 'POS',
      cell: (element: Gamme) => `${element.pos}`,
    },
    {
      prop: 'operation',
      label: 'Opération',
      cell: (element: Gamme) => `${element.operation}`,
    },
    {
      prop: 'executionTime',
      label: "Temps d'éxécution",
      cell: (element: Gamme) => `${element.executionTime}`,
    },
    {
      prop: 'workstation',
      label: "Poste de travail",
      cell: (element: Gamme) => `${element.workstation.codeWorkstation} - ${element.workstation.libelle}`,
    },
    {
      prop: 'articles',
      label: "Articles",
      cell: (element: Gamme) => `${element.articles.map(article => { return `${article.identifiant} - ${article.libelleFR}` }).toString()}`,
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
  disablePrint: boolean = true;
  dataSource = null;
  displayedColumns = [...this.columns.map(c => c.prop), 'action'];
  gammeForm: FormGroup;
  action: ACTIONS = ACTIONS.CREATE;
  defaultPageSize = 10;
  public resultsLength: any = 0;
  workstationOptions: Observable<Workstation[]>;
  workstations = []
  constructor(
    private toastr: ToastrService,
    public _sharedService: SharedService,
    public dialog: MatDialog,
    private _GammeService: GammeService,
    private _workstationService: WorkstationService,
    private _articleService: ArticleService) { }

  ngOnInit(): void {
    const pipe = new DatePipe('en-US');
    this._sharedService.tabChange$.subscribe(res => {
      if (res == 2 && this.selectedArticle) {
        this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize });
      }
    })
    this.gammeForm = new FormGroup({
      'id': new FormControl(),
      'pos': new FormControl(null, Validators.required),
      'operation': new FormControl(null, Validators.required),
      'executionTime': new FormControl(null, Validators.required),
      'workstation': new FormControl(null, Validators.required),
      'articles': new FormControl({ value: [] }),
      'rc': new FormControl(null),
      'preparationTime': new FormControl(null),
      'gs': new FormControl(null),
      'operationDetail': new FormControl(null),
      'observation': new FormControl(null),
      'version': new FormControl({ value: null, disabled: true }),
      'lastModified': new FormControl({ value: pipe.transform(null, 'MM/dd/yyyy'), disabled: true }),
    });
    this._workstationService.getAllWorkstations().pipe(map(workstations => workstations.map(workstation => ({ id: workstation.id, codeWorkstation: workstation.codeWorkstation, libelle: workstation.libelle })))).subscribe(res => {
      this.workstations = res;
      this.workstationOptions = this.gammeForm.get('workstation').valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : value?.codeGroupe;
          return name ? this._filter(name as string) : this.workstations.slice();
        }),
      );
      this.workstationOptions.subscribe(ff => {
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
    console.log('selected art : ',this.selectedArticle.id);
    this._GammeService.getAllGammes$Response({
      page: paginator.pageIndex,
      size: paginator.pageSize,
      sort: sort ? [sort] : null,
      filters: filters,
      id: this.selectedArticle.id
    }).subscribe(res => {
      this.resultsLength = Number(res.headers.get('X-Total-Count'))
      this.dataSource = res.body;
      this.disablePrint = this.dataSource.length < 0 ? true : false;

    })
  }

  clearFields() {
    this.gammeForm.reset();
    this.action = ACTIONS.CREATE
  }

  onSubmit() {
    if (this.selectedArticle) {
      let articles = []
      // console.log('articles//// : ', articles, this.gammeForm.get('articles').value.value.length);
      console.log('this.gammeForm : ',this.gammeForm.value,this.gammeForm.get('articles')?.value);
      this.gammeForm.get('articles')?.value?.length > 0
        ? articles = [...this.gammeForm.get('articles').value,this.selectedArticle]
        : articles.push(this.selectedArticle)
      this.gammeForm.get('articles').setValue(articles)
      if (this.action == ACTIONS.CREATE) {
        this.createGamme();
      } else {
        this.updateGamme();
      }
    }
  }

  createGamme() {
    this._GammeService.addGamme(this.gammeForm.value).subscribe(res => {
      console.log('res : ', res);
      this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize });
      this.toastr.success('Gamme ajouté avec succès', '', { toastClass: 'toastr-success' });
      this.clearFields();
    }, err => {
      this.toastr.error('Erreur', '', { toastClass: 'toastr-error' });
    })
  }

  updateGamme() {
    this._GammeService.updateGamme(this.gammeForm.value).subscribe(res => {
      this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize });
      this.toastr.success('Gamme modifié avec succès', '', { toastClass: 'toastr-success' });
      this.clearFields();
    }, err => {
      this.toastr.error('Erreur', '', { toastClass: 'toastr-error' });
    })
  }

  onActionClicked(event) {
    if (event.action.name == ACTIONS.DELETE) {

      const dialogRef = this.dialog.open(DeleteComponentComponent, {
        data: {
          title: 'Êtes-vous certain de vouloir supprimer cette opération ?',
          description: `Opération à supprimer: ${event.data.pos} - ${event.data.operation}`,
        },
      });

      dialogRef.afterClosed().subscribe((data) => {
        if (data) {
          this._GammeService.deleteGamme(event.data.id).subscribe(res => {
            this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize });
            this.toastr.success('Gamme supprimé avec succès', '', { toastClass: 'toastr-success' });
            this.clearFields();
          }, err => {
            this.toastr.error('Erreur', '', { toastClass: 'toastr-error' });
          })
        }
      });
    } else {
      console.log('this.articleFrom : ', event.data, this.gammeForm.value);
      delete event.data.createDate
      delete event.data.articleGammes
      delete event.data.gammeId

      this.gammeForm.setValue({ ...event.data, lastModified: this._sharedService.fromJsonDate(event.data.lastModified) })
      this.action = ACTIONS.UPDATE;
    }
  }

  displayFn(type: any, object): string {
    console.log('object displa: ', object);
    switch (type) {
      case 'article':
        if (object?.length > 0) {
          console.log('objectdd : ', object);
          return object?.filter(obj => obj.typeArticle != TypeArticle.PARENT).map(obj => (`${obj.identifiant} - ${obj.libelleFR}`)).toString()
        } else {
          return ''
        }
      default:
        return object && object.codeWorkstation ? `${object.codeWorkstation} - ${object.libelle}` : '';
    }
  }

  private _filter(codeWorkstation: string): Workstation[] {
    const filterValue = codeWorkstation.toLowerCase();
    return this.workstations.filter(option => option.codeWorkstation.toLowerCase().includes(filterValue));
  }

  disableInput(event: Event): void {
    event.preventDefault();
  }

  showArticles() {
    const dialogRef = this.dialog.open(MultiselectTableComponent, {
      data: {
        title: 'Liste des articles',
        articleId: 1,
        width: '850px',
        height: '750px',
        multiSelect: true,
        // model: this.gammeForm.get('articles'),
        getData: (data) => this._articleService.getChildArticles$Response(this.selectedArticle.id)
          .pipe(
            map(articles => {
              let body = articles.body.map(article =>
              ({
                ...article,
                typeArticle: TypeArticle.CHILD,
                checked: this.gammeForm.get('articles')?.value?.length ? this.gammeForm.get('articles')?.value?.find(item => item.id == article.id) ? true : false : false
              }))
              return { ...articles, body }
            })
          ),
        displayedColumns: ['select', ...this.articleColumns.map(c => c.prop)],
        columns: this.articleColumns
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      console.log('this.selection : ', data);
      if (data)
        this.gammeForm.get('articles').setValue(data)
      //this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize });
    });
  }

  printGamme() {
    const docDefinition = {

      content: [
        { text: `Document Gamme ${this.selectedArticle?.identifiant} - ${this.selectedArticle?.libelleFR}`, style: 'header', alignment: 'center' },
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
                        body: [
                          [
                            { text: "POS", style: 'tableHeader' },
                            { text: "Opération", style: 'tableHeader' },
                            { text: "Temp d'exécution", style: 'tableHeader' },
                            { text: "Poste de travail", style: 'tableHeader' },
                            { text: "Articles", style: 'tableHeader' }
                          ],
                          ...this.dataSource.map(gamme => {
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

    pdfmake.createPdf(docDefinition).download("Gamme.pdf");
  }

  
}
