import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, of, switchMap } from 'rxjs';
import { SuiviOfExtern } from 'src/api-v2/of-extern-suivi/models';
import { OfExternSuiviService } from 'src/api-v2/of-extern-suivi/services/of-extern-suivi-management.service';
import { Article } from 'src/api-v2/of-extern/models/article';
import { ArticleOfExtern } from 'src/api-v2/of-extern/models/article-of-extern';
import { DetailOfExtern } from 'src/api-v2/of-extern/models/detail-of-extern';
import { OfExternService } from 'src/api-v2/of-extern/services/of-extern-management.service';
import { DeleteComponentComponent } from 'src/app/shared/delete-component/delete-component.component';
import { ACTIONS } from 'src/app/shared/enum/Actions.enum';
import { MultiselectTableComponent } from 'src/app/shared/multiselect-table/multiselect-table.component';
import { SharedService } from 'src/app/shared/shared.service';
import { Actions } from 'src/app/shared/table/table.component';

export enum suiviType {
  MATIERE = 'MATIERE',
  PIECE_UNITAIRE = 'PIECE_UNITAIRE'
}

@Component({
  selector: 'app-of-extern-suivi',
  templateUrl: './of-extern-suivi.component.html',
  styleUrls: ['./of-extern-suivi.component.scss']
})
export class OfExternSuiviComponent implements OnInit {

  selectedIndexTab: number = 0;
  columns = [
    {
      prop: 'bonDeLivraison',
      label: 'BL',
      cell: (element: SuiviOfExtern) => `${element.bonDeLivraison}`,
    },
    {
      prop: 'date',
      label: 'Date',
      cell: (element: SuiviOfExtern) => `${this._sharedService.toDate(element.date)}`,
    },
    {
      prop: 'article',
      label: 'Matiére',
      cell: (element: SuiviOfExtern) => `${element.article.identifiant} - ${element.article.libelleFR}`,
    },
    {
      prop: 'quantity',
      label: 'Quentité',
      cell: (element: SuiviOfExtern) => `${element.quantity}`,
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
    },
    {
      prop: 'nbrTole',
      label: this.selectedIndexTab == 0 ? 'Nbr Tole' : 'Quantité',
      cell: (element: Article) => `${element.nbrTole}`,
    }
  ]

  displayedColumns = [...this.columns.map(c => c.prop), 'action'];

  actions: Actions[] = [
    {
      icon: 'delete',
      name: 'delete'
    }
  ]

  valueMatiere: number = 0;
  valuePiece: number = 0;
  max = 0;
  unitsMatiere: string = 'Taux de livraison Matiére';
  unitsPiece: string = 'Taux de réception Piéces';
  formatValue = (value: number) => `${value}%`;
  view: [number, number] = [200, 150];
  legend: boolean = true;
  legendPosition: string = 'below';

  ofId: number;
  ofExternForm: FormGroup;
  suiviForm: FormGroup;
  dataSource = null;
  action: ACTIONS = ACTIONS.CREATE;
  defaultPageSize = 10;
  public resultsLength: any = 0;
  matieres: DetailOfExtern[] = []
  details: ArticleOfExtern[] = [];

  constructor(private _suiviOFService: OfExternSuiviService,
    private toastr: ToastrService,
    public _sharedService: SharedService,
    public dialog: MatDialog,
    private _ofExternService: OfExternService) { }

  ngOnInit(): void {
    this.ofExternForm = new FormGroup({
      'id': new FormControl(),
      'numberOF': new FormControl(null),
      'delai': new FormControl({ value: null, disabled: true }),
      'date': new FormControl({ value: null, disabled: true }),
      'bonDeCommande': new FormControl({ value: null, disabled: true }),
      'observation': new FormControl({ value: null, disabled: true }),
    })
    this.suiviForm = new FormGroup({
      'bonDeLivraison': new FormControl(null, Validators.required),
      'date': new FormControl(null, Validators.required),
      'article': new FormControl(null, Validators.required),
      'quantity': new FormControl(null, Validators.required),
    })
    this.suiviForm.disable()
  }

  getOF(event: KeyboardEvent) {
    if (event.key != 'Enter')
      return;
    this._ofExternService.getOfExternById(this.ofExternForm.get('numberOF').value).pipe(
      switchMap((ofResult) => {
        this.ofId = ofResult.id
        // this.article = ofResult.article
        this.ofExternForm.patchValue({
          'id': ofResult.id,
          'numberOF': ofResult.numberOF,
          'bonDeCommande': ofResult.bonDeCommande,
          'observation': ofResult.observation,
          'delai': ofResult.delai,
          'date': ofResult.date,

        });
        return forkJoin([
          this._suiviOFService.getAllSuiviOFs$Response({
            page: 0,
            size: this.defaultPageSize,
            filter: [`eq,of.id,${ofResult.id}`, `cr,suiviType,${this.selectedIndexTab == 0 ? suiviType.MATIERE : suiviType.PIECE_UNITAIRE}`]
          }),
          this._ofExternService.getOfExternArticleById({
            page: 0,
            size: 10000,
            id: ofResult.id
          })
        ])
      })
    ).subscribe(([suiviResult, details]) => {
      console.log('suiviResult : ', suiviResult);
      this.dataSource = suiviResult.body
      this.resultsLength = Number(suiviResult.headers.get('X-Total-Count'))
      this.suiviForm.enable()
      this.matieres = details.flatMap(detail => detail.details.map(d => {
        return {
          ...d,
          article: {
            ...d.article,
            arcticle_ass: `${detail.article.identifiant} - ${detail.article.libelleFR} `,
            id_arcticle_ass: detail.article.id,
            nbrTole: d.nbrTole
          }
        }
      }))
      this.details = details
      this.selectedIndexTab == 0 ? this.calculatePercentageMatiere(this.matieres, this.dataSource)
        : this.calculatePercentagePiece(this.dataSource, this.details)
      // console.log('suiviResult : ', this.matieres);
    }, err => {
      this.toastr.error(`Order de fabrication extern avec ce numéro ${this.ofExternForm.get('numberOF').value} n'existe pas!`, '', { toastClass: 'toastr-error' });
      this.ofExternForm.reset()
      this.dataSource = []

    })
  }

  calculatePercentageMatiere(matieres: DetailOfExtern[], suiviResult: SuiviOfExtern[]) {
    const totalTole = matieres.reduce((sum, matiere) => sum + matiere.nbrTole, 0);
    const totalToleDelevred = suiviResult.filter(matiere => matiere.suiviType == suiviType.MATIERE).reduce((sum, matiere) => sum + matiere.quantity, 0);
    console.log('totalTole suiviResult : ', totalToleDelevred, totalTole, '  ---%  ', totalTole == 0 ? 0 : parseFloat(((totalToleDelevred / totalTole) * 100).toFixed(2)));
    this.valueMatiere = totalTole == 0 ? 0 : parseFloat(((totalToleDelevred / totalTole) * 100).toFixed(2));
  }

  calculatePercentagePiece(suiviResult, details) {
    const totalPieceDelevred = suiviResult.filter(piece => piece.suiviType == suiviType.PIECE_UNITAIRE).reduce((sum, piece) => sum + piece.quantity, 0);
    const totalQuantity = details.reduce((sum, article) => sum + article.quantity, 0);
    console.log('totalQuantity : ', totalPieceDelevred, totalQuantity, totalQuantity == 0 ? 0 : parseFloat(((totalPieceDelevred / totalQuantity) * 100).toFixed(2)));
    this.valuePiece = totalQuantity == 0 ? 0 : parseFloat(((totalPieceDelevred / totalQuantity) * 100).toFixed(2));

  }

  selectedIndexChange(index) {
    this.selectedIndexTab = index
    if (this.ofId) {
      this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize });
    }
  }

  loadData(paginator, filters?, sort?) {
    this._suiviOFService.getAllSuiviOFs$Response({
      page: paginator.pageIndex,
      size: paginator.pageSize,
      sort: sort ? [sort] : null,
      filter: [`eq,of.id,${this.ofId}`, `cr,suiviType,${this.selectedIndexTab == 0 ? suiviType.MATIERE : suiviType.PIECE_UNITAIRE}`]
    }).subscribe(res => {
      this.resultsLength = Number(res.headers.get('X-Total-Count'))
      console.log('totalTole suiviResult : ', this.matieres);
      this.dataSource = res.body;
      this.selectedIndexTab == 0 ? this.calculatePercentageMatiere(this.matieres, this.dataSource)
        : this.calculatePercentagePiece(this.dataSource, this.details)
    })
  }

  onTableChanges(tableChanges) {
    const { paginator, filters, sort } = (tableChanges);
    this.defaultPageSize = paginator.pageSize;
    this.clearFields();
    this.loadData(paginator, filters, sort);
  }

  onActionClicked(event) {
    console.log('eveeeeent : ', event);
    if (event.action.name == ACTIONS.DELETE) {
      const dialogRef = this.dialog.open(DeleteComponentComponent, {
        data: {
          title: `Êtes-vous certain de vouloir supprimer ce bon de ${this.selectedIndexTab == 0 ? 'livraison' : 'réception'} ?`,
          description: `Bon à supprimer: ${event.data.bonDeLivraison} 
          Article : ${event.data.article.identifiant} - ${event.data.article.libelleFR}`,
        },
      });
      dialogRef.afterClosed().subscribe((data) => {
        if (data) {
          this._suiviOFService.deleteSuiviOf(event.data.id).subscribe(res => {
            this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize });
            this.toastr.success('Bon supprimé avec succès', '', { toastClass: 'toastr-success' });
          }, err => {
            this.toastr.error(err?.error?.message, 'Erreur', { toastClass: 'toastr-error' });
          })
        }
      });
    }
    // else {
    //   delete event.data.createDate
    //   // let art = [...event.data.article]
    //   console.log('this.articleFrom : ', event.data.article);
    //   this.ofExternForm.setValue(event.data)
    //   this.disablePrint = false;
    //   this.action = ACTIONS.UPDATE;
    // }
  }

  addSuivi() {
    this._suiviOFService.addSuiviOf({
      ...this.suiviForm.value,
      suiviType: this.selectedIndexTab == 0 ? suiviType.MATIERE : suiviType.PIECE_UNITAIRE,
      of: this.ofExternForm.value,
      id_arcticle_ass: this.suiviForm.get('article').value.id_arcticle_ass
    }).subscribe(res => {
      this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize });
      this.toastr.success('Suivi ajouté avec succès', '', { toastClass: 'toastr-success' });
      this.clearFields();
    }, err => {
      console.log('err : ', err);

      this.toastr.error(err?.error?.message, 'Erreur', { toastClass: 'toastr-error' });
    })
  }

  clearFields() {
    this.suiviForm.reset();
  }

  disableInput(event: Event): void {
    event.preventDefault();
  }

  showMatiere() {
    const dialogRef = this.dialog.open(MultiselectTableComponent, {
      data: {
        title: this.selectedIndexTab == 0 ? 'Liste des Matiéres' : 'Liste des Pièces',
        articleId: 1,
        singleSelect: true,
        multiSelect: false,
        width: '850px',
        height: '750px',
        // model: this.matieres,
        getData: (data) => this.selectedIndexTab == 0 ? of({ body: [...this.matieres.map(matiere => matiere.article)] })
          : of({
            body: [...this.details.map(detail => {
              return {
                ...detail.article,
                nbrTole: detail.quantity
              }
            })]
          }),
        displayedColumns: [...[
          ...(this.selectedIndexTab == 0 ?
            [{
              prop: 'arcticle_ass',
              label: 'Article associé',
              cell: (element: Article) => `${element.arcticle_ass}`,
              filterable: true,
              filterOptions: {
                type: 'input',
                mode: 'cr',
                prop: 'identifiant'
              }

            }] : []),
          ...this.articleColumns
        ].map(c => c.prop)],
        columns: [
          ...(this.selectedIndexTab == 0 ?
            [{
              prop: 'arcticle_ass',
              label: 'Article associé',
              cell: (element: Article) => `${element.arcticle_ass}`,
              filterable: true,
              filterOptions: {
                type: 'input',
                mode: 'cr',
                prop: 'identifiant'
              }

            }] : []),
          ...this.articleColumns
        ]
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      console.log('this.selection : ', data, this.details);
      console.log('this.selection : ', this.dataSource,this.matieres);
      if (data) {

        this.suiviForm.get('article').setValue(data)
        this.suiviForm.get('quantity')?.setValidators([
          Validators.required,
          Validators.pattern(/^\d+$/),      
          Validators.max(this.getMax(data))               
        ]);
        this.suiviForm.get('quantity')?.updateValueAndValidity()
      }

    });
  }

  getMax(data){
    let nbrToleALivrai;
    let nbrToleLivrer;
    if(this.selectedIndexTab == 0){
      nbrToleLivrer = this.dataSource.filter(detail => detail.article.id == data.id && detail.id_arcticle_ass == data.id_arcticle_ass)?.
      reduce((sum, matiere) => sum + matiere.quantity, 0);
      nbrToleALivrai = data.nbrTole
    } else {
      nbrToleLivrer = this.dataSource.filter(detail => detail.article.id == data.id)?.reduce((sum, piece) => sum + piece.quantity, 0);
      nbrToleALivrai = data.nbrTole
      console.log('totla : ',nbrToleALivrai,nbrToleLivrer);
    }
    this.max = nbrToleALivrai - nbrToleLivrer
    return this.max
  }

  displayFn(object): string {
    console.log('object ggg : ', object);
    if (object?.identifiant || object?.libelleFR) {
      return `${object.identifiant} - ${object.libelleFR}`
    } else {
      return ''
    }
  }

}
