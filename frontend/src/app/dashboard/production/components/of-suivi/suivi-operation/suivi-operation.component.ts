import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { Article } from 'src/api-v2/article/models';
import { ArticleService } from 'src/api-v2/article/services/article-management.service';
import { OfSuiviService } from 'src/api-v2/of-suivi/services/of-suivi-management.service';
import { Travailleur } from 'src/api-v2/travailleur/models';
import { TravailleurService } from 'src/api-v2/travailleur/services/travailleur-management.service';
import { SuiviOfTravailleurManagementService } from 'src/api-v2/vd-openapi-generator/services/suivi-of-travailleur-management.service';
import { Workstation } from 'src/api-v2/workstation/models';
import { WorkstationService } from 'src/api-v2/workstation/services/workstation-management.service';
import { ACTIONS } from 'src/app/shared/enum/Actions.enum';
import { MultiselectTableComponent } from 'src/app/shared/multiselect-table/multiselect-table.component';

@Component({
  selector: 'app-suivi-operation',
  templateUrl: './suivi-operation.component.html',
  styleUrls: ['./suivi-operation.component.scss']
})
export class SuiviOperationComponent implements OnInit {

  suiviForm: FormGroup;
  travailleurForm: FormGroup;
  action: ACTIONS = ACTIONS.CREATE;
  workstationOptions: Observable<Workstation[]>;
  workersOptions: Observable<Travailleur[]>;
  workstations = [];
  workers: Travailleur[] = [];
  articles: Article[] = [];
  ofId: number;
  ofNumber: string;
  article: any;
  travailleursTable: { id?: number; travailleur: { id: number; codeTravailleur: string; libelle: string }; quantite: number; tempEffectif: number }[] = [];
  editingIndex: number | null = null;

  articleColumns = [
    {
      prop: 'identifiant',
      label: 'Identifiant',
      cell: (element: Article) => `${element.identifiant}`,
      filterable: true,
      filterOptions: { type: 'input', mode: 'cr', prop: 'identifiant' }
    },
    {
      prop: 'identifiantSomatel',
      label: 'Identifiant Somatel',
      cell: (element: Article) => `${element.identifiantSomatel}`,
      filterable: true,
      filterOptions: { type: 'input', mode: 'cr', prop: 'identifiantSomatel' }
    },
    {
      prop: 'libelleFR',
      label: 'Designation FR',
      cell: (element: Article) => `${element.libelleFR}`,
      filterable: true,
      sortable: true,
      filterOptions: { type: 'input', mode: 'cr', prop: 'libelleFR' }
    }
  ];

  constructor(
    private toastr: ToastrService,
    public dialog: MatDialog,
    private _ofSuiviService: OfSuiviService,
    private _workstationService: WorkstationService,
    private _travailleurService: TravailleurService,
    private _suiviOfTravailleurService: SuiviOfTravailleurManagementService,
    private _articleService: ArticleService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const state = history.state;
    this.ofId = state.ofId;
    this.ofNumber = state.ofNumber;
    this.article = state.article;
    const operation = state.operation;

    if(!this.article){
      this.router.navigate(['/production/suivi_of_intern'])
    }

    this.suiviForm = new FormGroup({
      'id': new FormControl(),
      'pos': new FormControl(null, Validators.required),
      'operation': new FormControl(null, Validators.required),
      'executionTime': new FormControl(null, Validators.required),
      'idWorkstation': new FormControl(null, Validators.required),
      'travailleurs': new FormControl(null, Validators.required),
      'idsArticles': new FormControl({ value: [] }),
      'startDate': new FormControl(null),
      'endDate': new FormControl(null),
      'preparationTime': new FormControl(null),
      'gs': new FormControl(null),
      'operationDetail': new FormControl(null),
      'rc': new FormControl(null),
      'observation': new FormControl(null),
    });

    this.travailleurForm = new FormGroup({
      'idTravailleur': new FormControl(null, Validators.required),
      'quantite': new FormControl(null, Validators.required),
      'tempEffectif': new FormControl(null, Validators.required),
    });

    combineLatest([
      this._workstationService.getAllWorkstations(),
      this._travailleurService.getAllTravailleurs(),
      this._articleService.getAllArticles()
    ]).pipe(map(([workstations, workers, articles]) => {
      this.workstations = workstations.map(w => ({ id: w.id, codeWorkstation: w.codeWorkstation, libelle: w.libelle }));
      this.workers = workers.map(wk => ({ id: wk.id, codeTravailleur: wk.codeTravailleur, libelle: wk.libelle }));
      this.articles = articles.map(a => ({ id: a.id, identifiant: a.identifiant, libelleFR: a.libelleFR }));
    })).subscribe(() => {
      if (operation) {
        this.action = ACTIONS.UPDATE;
        this.suiviForm.patchValue(operation);
        if (operation.travailleurs?.length > 0) {
          this.travailleursTable = operation.travailleurs.map(t => ({
            id: t.id,
            travailleur: { id: t.travailleur.id, codeTravailleur: t.travailleur.codeTravailleur, libelle: t.travailleur.libelle },
            quantite: t.quantite,
            tempEffectif: t.tempEffectif
          }));
        }
      }
      this.workstationOptions = this.suiviForm.get('idWorkstation').valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : value?.codeGroupe;
          return name ? this._filter(name as string) : this.workstations.slice();
        }),
      );
      this.workersOptions = this.travailleurForm.get('idTravailleur').valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : null;
          return name ? this._filterWorkers(name) : this.workers.slice();
        }),
      );
    });
  }

  clearFields() {
    this.suiviForm.reset();
    this.action = ACTIONS.CREATE;
  }

  onSubmit() {
    if (this.action === ACTIONS.CREATE) {
      this.createOperation();
    } else {
      this.updateOperation();
    }
  }

  createOperation() {
    this._ofSuiviService.addSuiviOf({
      ...this.suiviForm.value,
      idOf: this.ofId,
      idArticle: this.article?.id
    }).subscribe(() => {
      this.toastr.success('Opération ajoutée avec succès', '', { toastClass: 'toastr-success' });
      this.navigateBack();
    }, () => {
      this.toastr.error('Erreur', '', { toastClass: 'toastr-error' });
    });
  }

  updateOperation() {
    this._ofSuiviService.updateSuiviOf({
      ...this.suiviForm.value,
      idOf: this.ofId,
      idArticle: this.article?.id
    }).subscribe(() => {
      this.toastr.success('Opération modifiée avec succès', '', { toastClass: 'toastr-success' });
      this.navigateBack();
    }, () => {
      this.toastr.error('Erreur', '', { toastClass: 'toastr-error' });
    });
  }

  selectTravailleur(row: any, index: number) {
    this.editingIndex = index;
    this.travailleurForm.patchValue({
      idTravailleur: row.travailleur.id,
      quantite: row.quantite,
      tempEffectif: row.tempEffectif
    });
  }

  cancelEdit() {
    this.editingIndex = null;
    this.travailleurForm.reset();
  }

  saveTravailleur() {
    const idTravailleur = this.travailleurForm.get('idTravailleur').value;
    const worker = this.workers.find(w => w.id === idTravailleur);
    if (!worker) return;

    const quantite = this.travailleurForm.get('quantite').value;
    const tempEffectif = this.travailleurForm.get('tempEffectif').value;

    if (this.editingIndex !== null) {
      const currentRow = this.travailleursTable[this.editingIndex];
      const updatedRow = {
        ...currentRow,
        travailleur: { id: worker.id, codeTravailleur: worker.codeTravailleur, libelle: worker.libelle },
        quantite,
        tempEffectif
      };
      this.travailleursTable[this.editingIndex] = updatedRow;
      this.suiviForm.get('travailleurs').setValue([...this.travailleursTable]);

      if (currentRow.id) {
        this._suiviOfTravailleurService.update({ body: updatedRow }).subscribe({
          next: () => this.toastr.success('Travailleur modifié avec succès', '', { toastClass: 'toastr-success' }),
          error: () => this.toastr.error('Erreur lors de la modification', '', { toastClass: 'toastr-error' })
        });
      }

      this.editingIndex = null;
      this.travailleurForm.reset();
    } else {
      this.travailleursTable.push({
        travailleur: { id: worker.id, codeTravailleur: worker.codeTravailleur, libelle: worker.libelle },
        quantite,
        tempEffectif
      });
      this.suiviForm.get('travailleurs').setValue([...this.travailleursTable]);
      this.travailleurForm.reset();
    }
  }

  removeTravailleur(index: number) {
    const row = this.travailleursTable[index];

    if (this.editingIndex === index) {
      this.editingIndex = null;
      this.travailleurForm.reset();
    } else if (this.editingIndex !== null && index < this.editingIndex) {
      this.editingIndex--;
    }

    this.travailleursTable.splice(index, 1);
    this.suiviForm.get('travailleurs').setValue(
      this.travailleursTable.length > 0 ? [...this.travailleursTable] : null
    );

    if (row.id) {
      this._suiviOfTravailleurService.delete({ id: row.id }).subscribe({
        next: () => this.toastr.success('Travailleur supprimé avec succès', '', { toastClass: 'toastr-success' }),
        error: () => this.toastr.error('Erreur lors de la suppression', '', { toastClass: 'toastr-error' })
      });
    }
  }

  navigateBack() {
    this.router.navigate(['suivi_of_intern'], {
      relativeTo: this.route.parent,
      queryParams: { ofNumber: this.ofNumber }
    });
  }

  goBack() {
    this.location.back();
  }

  displayFn(type: any, object): string {
    switch (type) {
      case 'workstation':
        return object ? this.workstations.filter(w => object == w.id).map(w => `${w.codeWorkstation} - ${w.libelle}`).toString() : '';
      case 'travailleur':
        return object ? this.workers.filter(w => object == w.id).map(w => `${w.codeTravailleur} - ${w.libelle}`).toString() : '';
      case 'workers':
        if (object?.length > 0) {
          return this.workers.filter(worker => object.includes(worker.id)).map(worker => `${worker.codeTravailleur} - ${worker.libelle}`).toString();
        }
        return '';
      case 'articles':
        if (object?.length > 0) {
          return this.articles.filter(article => object.includes(article.id)).map(article => `${article.identifiant} - ${article.libelleFR}`).toString();
        }
        return '';
      default:
        return object ? `${object.libelle}` : '';
    }
  }

  private _filter(codeWorkstation: string): Workstation[] {
    const filterValue = codeWorkstation.toLowerCase();
    return this.workstations.filter(option => option.codeWorkstation.toLowerCase().includes(filterValue));
  }

  private _filterWorkers(code: string): Travailleur[] {
    const filterValue = code.toLowerCase();
    return this.workers.filter(option => option.codeTravailleur.toLowerCase().includes(filterValue));
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
        getData: () => this._articleService.getAllArticles$Response()
          .pipe(
            map(articles => {
              const body = articles.body.map(article => ({
                ...article,
                checked: this.suiviForm.get('idsArticles')?.value?.length
                  ? this.suiviForm.get('idsArticles')?.value?.find(item => item == article.id) ? true : false
                  : false
              }));
              return { ...articles, body };
            })
          ),
        displayedColumns: ['select', ...this.articleColumns.map(c => c.prop)],
        columns: this.articleColumns
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data)
        this.suiviForm.get('idsArticles').setValue(data.map(({ id }) => id));
    });
  }
}