import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, map, of, switchMap } from 'rxjs';
import { Article } from 'src/api-v2/article/models';
import { ArticleService } from 'src/api-v2/article/services/article-management.service';
import { ArticleNomenclature } from 'src/api-v2/nomenclature/models';
import { NomenclatureService } from 'src/api-v2/nomenclature/services/nomenclature-management.service';
import { ArticleOfExtern } from 'src/api-v2/of-extern/models/article-of-extern';
import { DetailOfExtern } from 'src/api-v2/of-extern/models/detail-of-extern';
import { OfExternService } from 'src/api-v2/of-extern/services/of-extern-management.service';
import { DeleteComponentComponent } from 'src/app/shared/delete-component/delete-component.component';
import { ACTIONS } from 'src/app/shared/enum/Actions.enum';
import { MultiselectTableComponent } from 'src/app/shared/multiselect-table/multiselect-table.component';
import { Actions } from 'src/app/shared/table/table.component';

@Component({
  selector: 'app-pieces-unitaire',
  templateUrl: './pieces-unitaire.component.html',
  styleUrls: ['./pieces-unitaire.component.scss']
})
export class PiecesUnitaireComponent implements OnInit, AfterViewInit {

  columns = [
    {
      prop: 'article',
      label: 'Article',
      cell: (element: ArticleOfExtern) => `${element.article.identifiantSomatel} - ${element.article.libelleFR}`,
    },
    {
      prop: 'quantity',
      label: 'Quentité',
      cell: (element: ArticleOfExtern) => `${element.quantity}`,
    }
  ];

  articleColumns = [
    {
      prop: 'nature',
      label: "Type d'article",
      cell: (element: Article) => `${element.nature}`,
      cellClass: (element: Article) => {
        return element.nature === 'Article' ? 'article-cell' : 'piece-cell';
      },
      filterable: true,
      filterOptions: {
        type: 'select',
        mode: 'cr',
        prop: 'nature',
        selectConfig: {
          selectOptions: [
            {
              id: 'Article',
              label: 'Article',
            },
            {
              id: 'Piece_Unitaire',
              label: 'Piece unitaire'
            },
          ],
        }
      }

    },
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
    }
  ]

  articleDetailsColumns = [
    {
      prop: 'article',
      label: 'Matiere',
      cell: (element: DetailOfExtern) => `${element.article.identifiant} - ${element.article.libelleFR}`,
    },
    {
      prop: 'poids',
      label: 'Poids',
      cell: (element: DetailOfExtern) => `${element.poids}`,
    },
    {
      prop: 'nbrTole',
      label: 'Nombre de tole',
      cell: (element: DetailOfExtern) => `${element.nbrTole}`,
    },
  ]

  actions: Actions[] = [
    {
      icon: 'list_alt',
      name: 'show_details',
      tooltip: 'Afficher détail'
    },
    {
      icon: 'delete',
      name: 'delete'
    }
  ]

  displayedColumns = [...this.columns.map(c => c.prop), 'action'];
  public resultsLength: any = 0;
  defaultPageSize = 10;
  dataSource = null;
  numberOF;
  ofId;
  ofForm: FormGroup;
  action: ACTIONS = ACTIONS.CREATE;
  matieres: ArticleNomenclature[] = []
  details: DetailOfExtern[] = []
  displayLoader: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService,
    public _articleService: ArticleService,
    private _nomenclatureService: NomenclatureService,
    private _ofService: OfExternService
  ) {
    this.activatedRoute.params.subscribe(({ id, numberOF }) => {
      this.numberOF = numberOF;
      this.ofId = id
      this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize }, id);
    })
  }

  ngOnInit(): void {
    this.ofForm = new FormGroup({
      'id': new FormControl(),
      'quantity': new FormControl(null, [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]),
      'article': new FormControl({}, Validators.required),
    });
  }

  loadData(paginator, ofId) {
    this._ofService.getOfExternArticleById$Response({
      page: paginator.pageIndex,
      size: paginator.pageSize,
      id: ofId
    }).subscribe(res => {
      console.log('res --: ', res);
      this.resultsLength = Number(res.headers.get('X-Total-Count'))
      this.dataSource = res.body;
    })
  }

  onSubmit() {
    if (this.action == ACTIONS.CREATE) {
      this.addArticle(this.ofForm.value);
    } else {
      this.updateArticle(this.ofForm.value);
    }
  }

  disableInput(event: Event): void {
    event.preventDefault();
  }

  showArticles() {
    const dialogRef = this.dialog.open(MultiselectTableComponent, {
      data: {
        title: 'Liste des articles / Pièces unitaire',
        articleId: 1,
        singleSelect: true,
        multiSelect: false,
        width: '850px',
        height: '750px',
        // model: this.ofForm.get('article'),
        getData: (data) => this._articleService.getAllArticles$Response({
          page: data.page.pageIndex,
          size: data.size.pageSize,
          sort: data.sort ? [data.sort] : null,
          filters: data.filters?.length 
          ? data.filters.find(filter => filter.includes('nature')) 
            ? [...data.filters] 
            : [...data.filters, 'noteq,nature,Matiere'] 
          : ['noteq,nature,Matiere']
        }).pipe(
          map(articles => {
            let body = articles.body.map(article =>
            ({
              ...article,
              //checked: this.ofInternForm.get('article')?.value?.length ? this.ofInternForm.get('article')?.value?.find(item => item.id == article.id) ? true : false : false
            }))
            return { ...articles, body }
          })
        ),
        displayedColumns: [...this.articleColumns.map(c => c.prop)],
        columns: this.articleColumns
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log('data----**** : ', data);
        this.ofForm.get('article').setValue(data)

        this._nomenclatureService.getAllArticleNomenclatures({
          page: 0,
          size: 10000,
          id: data.id
        }).pipe(
          switchMap(articles => {
            if(data.nature == 'Piece_Unitaire'){
              return of(articles)
            } else {
              let ids = articles.filter(article => article.article.nature == 'Piece_Unitaire').map(article => {
                return article.article.id
              })
              return this._nomenclatureService.getAllArticleNomenclaturesUsingIds(ids)
            }
          })
        )
        .subscribe(res => {
          this.matieres = res
          console.log('boolean ress : ', this.matieres);
          this.calculateNbrTole();
        })
      }
      //this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize });
    });
  }

  showDetails(data) {
    const dialogRef = this.dialog.open(MultiselectTableComponent, {
      data: {
        title: `Détail pour la pièce unitaire ${data.article.identifiant} - ${data.article.libelleFR}`,
        articleId: 1,
        singleSelect: true,
        multiSelect: false,
        // previewMode: true,
        fromUnitPrice: true,
        hidePagination: true,
        width: '850px',
        height: '750px',
        model: data.details,
        // getData: (data) => this._articleService.getAllArticles$Response({
        //   page: data.page.pageIndex,
        //   size: data.size.pageSize,
        //   sort: data.sort ? [data.sort] : null,
        //   filters: data.filters ? [...data.filters, 'cr,nature,Piece_Unitaire'] : ['cr,nature,Piece_Unitaire']
        // }).pipe(
        //   map(articles => {
        //     let body = articles.body.map(article =>
        //     ({
        //       ...article,
        //       //checked: this.ofInternForm.get('article')?.value?.length ? this.ofInternForm.get('article')?.value?.find(item => item.id == article.id) ? true : false : false
        //     }))
        //     return { ...articles, body }
        //   })
        // ),
        displayedColumns: [...this.articleDetailsColumns.map(c => c.prop)],
        columns: this.articleDetailsColumns
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      console.log('data--- : ',data);
      this.onSubmit()
      // if (data) {
      //   this.ofForm.get('article').setValue(data)
      //   this._nomenclatureService.getAllArticleNomenclatures({
      //     page: 0,
      //     size: 10000,
      //     id: data.id
      //   }).subscribe(res => {
      //     this.matieres = res
      //     console.log('boolean ress : ', this.matieres);
      //     this.calculateNbrTole();
      //   })
      // }
    });
  }

  showDetailsTmpr(){
    let data = {
      article: this.ofForm.get('article').value,
      details: [...this.details]
    }
    this.showDetails(data)
  }

  displayFn(object): string {
    console.log('object ggg : ', object);
    if (object?.identifiant || object?.libelleFR) {
      return `${object.identifiant} - ${object.libelleFR}`
    } else {
      return ''
    }
  }

  onTableChanges(tableChanges) {
    const { paginator, filters, sort } = (tableChanges);
    this.defaultPageSize = paginator.pageSize;
    this.loadData(paginator, this.ofId);
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
          this._ofService.deleteOfExternArticle(event.data.id).subscribe(res => {
            this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize }, this.ofId);
            this.toastr.success('Article supprimé avec succès', '', { toastClass: 'toastr-success' });
            this.clearFields();
          }, err => {
            this.toastr.error(err?.error?.message, 'Erreur', { toastClass: 'toastr-error' });
          })
        }
      });
    } else if(event.action.name == ACTIONS.SHOW_DETAILS) {
      this.showDetails(event.data)
    } else {
      delete event.data.createDate
      // let art = [...event.data.article]
      this.ofForm.setValue(event.data)
      this.action = ACTIONS.UPDATE;
    }
  }

  addArticle(dataTosSend) {
    console.log('dataTosSend : ',dataTosSend);
    // this.displayLoader = true
    return
    this._ofService.addOfExternArticle({
      ...dataTosSend,
      details: this.details,
      ofExtern: {id: this.ofId, numberOF: this.numberOF}
    }).subscribe(res => {
      this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize }, this.ofId);
      this.toastr.success('Article ajouté avec succès', '', { toastClass: 'toastr-success' });
      this.displayLoader = false
      this.clearFields();
    }, err => {
      console.log('err : ', err);
      this.toastr.error(err?.error?.message, 'Erreur', { toastClass: 'toastr-error' });
      this.displayLoader = false
    })
  }

  updateArticle(dataTosSend) {
    this._ofService.updateOfExternArticle(dataTosSend).subscribe(res => {
      console.log('res : ', res);
      this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize }, this.ofId);
      this.toastr.success('Article modifié avec succès', '', { toastClass: 'toastr-success' });
      this.clearFields();
    }, err => {
      this.toastr.error(err?.error?.message, 'Erreur', { toastClass: 'toastr-error' });
    })
  }

  clearFields() {
    this.ofForm.reset();
    this.details = [];
    this.action = ACTIONS.CREATE
  }

  goBack() {
    this.router.navigate([`/production/of_extern`])
  }

  ngAfterViewInit(): void {
    this.ofForm.get('quantity').valueChanges.pipe(
      map((res) => {
        this.ofForm.updateValueAndValidity();
        return res
      }),
      debounceTime(500)
    ).subscribe(res => {
      this.calculateNbrTole();
    })

    // this.ofForm.get('article').valueChanges.subscribe(res => {
    //   console.log('boolean article: ', typeof res, res);
    //   this.ofForm.updateValueAndValidity();
    //   this.calculateNbrTole();
    // })
  }

  calculateNbrTole() {
    
    const article = this.ofForm.get('article').value;
    const quantity: number = parseInt(this.ofForm.get('quantity').value);
    if (quantity > 0
      && this.matieres.length > 0
      && this.ofForm.valid
    ) {
      this.details = []
      this.displayLoader = true;
      this.matieres.map(matiere => {
        let taux_piece_unitaire: number = parseInt(article.facteurTaux),
          quantity_matiere: number = matiere.quantity,
          facteur_matiere: number = matiere.article?.facteurTaux,
          poids = 0,
          nbrTole = 0;

        poids = quantity * (quantity_matiere / (1 - (taux_piece_unitaire / 100)))

        if (facteur_matiere != 0) {
          nbrTole = Math.ceil(poids / facteur_matiere)
        } else {
          nbrTole = 0
        }

        this.details.push({
          articleOFExtern: article,
          article: matiere.article,
          nbrTole: nbrTole,
          poids: poids
        })

      })
      this.displayLoader = false;
      console.log('boolean tolee: ', this.details);
    }
  }

}
