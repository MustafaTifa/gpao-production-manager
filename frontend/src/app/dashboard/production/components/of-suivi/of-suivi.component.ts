import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, map, switchMap } from 'rxjs';
import { Article } from 'src/api-v2/article/models';
import { ArticleService } from 'src/api-v2/article/services/article-management.service';
import { OfService } from 'src/api-v2/of-intern/services/of-management.service';
import { SuiviOf } from 'src/api-v2/of-suivi/models/suivi-of';
import { OfSuiviService } from 'src/api-v2/of-suivi/services/of-suivi-management.service';
import { Travailleur } from 'src/api-v2/travailleur/models';
import { TravailleurService } from 'src/api-v2/travailleur/services/travailleur-management.service';
import { WorkstationService } from 'src/api-v2/workstation/services/workstation-management.service';
import { DeleteComponentComponent } from 'src/app/shared/delete-component/delete-component.component';
import { ACTIONS } from 'src/app/shared/enum/Actions.enum';
import { Actions } from 'src/app/shared/table/table.component';
import { PiecesSupComponent } from './pieces-sup/pieces-sup.component';
import pdfmake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfmake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-of-suivi',
  templateUrl: './of-suivi.component.html',
  styleUrls: ['./of-suivi.component.scss']
})
export class OfSuiviComponent implements OnInit {

  columns = [
    {
      prop: 'pos',
      label: 'POS',
      cell: (element: SuiviOf) => `${element.pos}`,
    },
    {
      prop: 'operation',
      label: 'Opération',
      cell: (element: SuiviOf) => `${element.operation}`,
    },
    {
      prop: 'executionTime',
      label: "Temps d'éxécution",
      cell: (element: SuiviOf) => `${element.executionTime}`,
    },
    {
      prop: 'idWorkstation',
      label: "Poste de travail",
      cell: (element: SuiviOf) => `${element.idWorkstation}`,
    },
    // {
    //   prop: 'idsWorkers',
    //   label: "Travaillieurs",
    //   cell: (element: SuiviOf) => `${
    //     this.workers.filter(worker => element.idsWorkers.includes(worker.id)).map(worker => {
    //       return `${worker.codeTravailleur} - ${worker.libelle}`
    //     })
    //   }`,
    // },
    {
      prop: 'idsArticles',
      label: "Articles",
      cell: (element: SuiviOf) => `${this.articles.filter(article => element.idsArticles?.includes(article.id)).map(article => {
        return `${article.identifiant} - ${article.libelleFR}`
      })
        }`,
    },
    {
      prop: 'startDate',
      label: "Date début",
      cell: (element: SuiviOf) => element.startDate ? new Date(element.startDate).toLocaleDateString('fr-FR') : '',
    },
    {
      prop: 'endDate',
      label: "Date fin",
      cell: (element: SuiviOf) => element.endDate ? new Date(element.endDate).toLocaleDateString('fr-FR') : '',
    },
  ];

  actions: Actions[] = [
    { icon: 'edit', name: 'edit' },
    { icon: 'delete', name: 'delete' }
  ];

  dataSource = null;
  displayedColumns = [...this.columns.map(c => c.prop), 'action'];
  ofInternForm: FormGroup;
  defaultPageSize = 10;
  public resultsLength: any = 0;
  workstations = [];
  workers: Travailleur[] = [];
  articles: Article[] = [];
  ofId;
  article;
  of;
  constructor(
    private toastr: ToastrService,
    public dialog: MatDialog,
    private _ofService: OfService,
    private _ofSuiviService: OfSuiviService,
    private _workstationService: WorkstationService,
    private _travailleurService: TravailleurService,
    private _articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.ofInternForm = new FormGroup({
      'id': new FormControl(),
      'numberOF': new FormControl(null),
      'article': new FormControl({ value: null, disabled: true }),
      'quantity': new FormControl({ value: null, disabled: true }),
      'delai': new FormControl({ value: null, disabled: true }),
      'date': new FormControl({ value: null, disabled: true }),
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
      const ofNumber = this.route.snapshot.queryParams['ofNumber'];
      if (ofNumber) {
        this.ofInternForm.get('numberOF').setValue(ofNumber);
        this.loadOFByNumber(ofNumber);
      }
    });
  }

  loadOFByNumber(ofNumber: any) {
    this._ofService.getOfInternById(ofNumber).pipe(
      switchMap((ofResult) => {
        this.ofId = ofResult.id;
        this.article = ofResult.article;
        this.of = ofResult;
        this.ofInternForm.patchValue({
          'id': ofResult.id,
          'numberOF': ofResult.numberOF,
          'article': ofResult.article,
          'quantity': ofResult.quantity,
          'delai': ofResult.delai,
          'date': ofResult.date,
        });
        return this._ofSuiviService.getAllSuiviOFs$Response({ id: ofResult.id });
      })
    ).subscribe(suiviResult => {
      this.dataSource = suiviResult.body;
    }, () => {
      this.toastr.error(`Order de fabrication avec ce numéro ${ofNumber} n'existe pas!`, '', { toastClass: 'toastr-error' });
      this.ofInternForm.reset();
      this.dataSource = [];
    });
  }

  getOF(event: KeyboardEvent) {
    if (event.key != 'Enter') return;
    this.loadOFByNumber(this.ofInternForm.get('numberOF').value);
  }

  onTableChanges(tableChanges) {
    const { paginator, filters, sort } = tableChanges;
    this.defaultPageSize = paginator.pageSize;
    this.loadData(paginator, filters, sort);
  }

  loadData(paginator, filters?, sort?) {
    this._ofSuiviService.getAllSuiviOFs$Response({
      page: paginator.pageIndex,
      size: paginator.pageSize,
      sort: sort ? [sort] : null,
      filters: filters,
      id: this.ofInternForm.get('id').value
    }).subscribe(res => {
      this.resultsLength = Number(res.headers.get('X-Total-Count'));
      this.dataSource = res.body;
    });
  }

  navigateToAddOperation() {
    this.router.navigate(['suivi_of_intern/operation'], {
      relativeTo: this.route.parent,
      state: {
        ofId: this.ofId,
        ofNumber: this.ofInternForm.get('numberOF').value,
        article: this.article
      }
    });
  }

  navigateToEditOperation(operation) {
    this.router.navigate(['suivi_of_intern/operation'], {
      relativeTo: this.route.parent,
      state: {
        ofId: this.ofId,
        ofNumber: this.ofInternForm.get('numberOF').value,
        article: this.article,
        operation: operation
      }
    });
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
          this._ofSuiviService.deleteSuiviOf(event.data.id).subscribe(() => {
            this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize });
            this.toastr.success('SuiviOf supprimé avec succès', '', { toastClass: 'toastr-success' });
          }, () => {
            this.toastr.error('Erreur', '', { toastClass: 'toastr-error' });
          });
        }
      });
    } else {
      const operation = { ...event.data };
      delete operation.idOf;
      delete operation.idArticle;
      this.navigateToEditOperation(operation);
    }
  }

  displayFn(type: any, object): string {
    switch (type) {
      case 'article':
        return object && object.identifiant ? `${object.identifiant} - ${object.libelleFR}` : '';
      default:
        return object ? `${object.libelle}` : '';
    }
  }

  addSupPieces() {
    this.dialog.open(PiecesSupComponent, {
      data: {
        ofId: this.ofId,
        article: this.article
      }
    });
  }

  printGamme() {
    if (!this.dataSource || !this.article) {
      this.toastr.error('Veuillez charger un OF avant d\'imprimer', '', { toastClass: 'toastr-error' });
      return;
    }

    const formatDate = (date: any) => {
      if (!date) return '';
      const d = new Date(date);
      const day = d.getDate().toString().padStart(2, '0');
      const months = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
      const month = months[d.getMonth()];
      const year = d.getFullYear();
      return `${day}-${month}-${year}`;
    };

    const operationsRows = [...this.dataSource].sort((a, b) => (a.pos || '').localeCompare(b.pos || '')).map((op: SuiviOf) => {
      const workstation = this.workstations.find(w => w.id === op.idWorkstation);
      const workstationCode = workstation ? workstation.codeWorkstation : '';

      return [
        { text: op.pos || '', style: 'tableCell', alignment: 'center' },
        { text: workstationCode, style: 'tableCell', alignment: 'center' },
        { text: `${(op.executionTime * this.of.quantity + op.preparationTime) / this.of.quantity}` || '', style: 'tableCell', alignment: 'right' },
        { text: op.preparationTime, style: 'tableCell', alignment: 'right' },
        { text: op.executionTime || '', style: 'tableCell', alignment: 'right' },
        //{ text: '', style: 'tableCell', alignment: 'right' },
        { text: op.rc || '', style: 'tableCell', alignment: 'center' },
        {
          stack: [
            { text: op.operation || '', style: 'operationName' },
            { text: op.operationDetail || '', style: 'operationCell' }
          ],
          alignment: 'left'
        }
      ];
    });

    const docDefinition: any = {
      pageSize: 'A4',
      pageOrientation: 'landscape',
      pageMargins: [20, 20, 20, 30],

      footer: (currentPage: number, pageCount: number) => ({
        text: `Page ${currentPage} de ${pageCount}`,
        alignment: 'center',
        fontSize: 9,
        margin: [0, 10, 0, 0]
      }),

      content: [
        // { text: 'SOMATEL-LIEBHERR', style: 'mainHeader', margin: [0, 0, 0, 10] },
        {
          table: {
            widths: [100, '*', 150, 150, 150],
            body: [
              [
                { text: 'GAMME\nD\'OPERATION', style: 'headerCell', bold: true, rowSpan: 2, alignment: 'center' },
                // { text: 'Désignation:', style: 'labelCell' },
                { text: `Désignation: ${this.article?.libelleFR} ` || '', style: 'valueCell', bold: true },
                { text: 'N° Dessin', style: 'labelCell', alignment: 'center' },
                { text: 'N° IdentificationSLH', style: 'labelCell', alignment: 'center' },
                { text: 'N° IdentificationLH', style: 'labelCell', alignment: 'center' },
              ],
              [
                {},
                { text: 'N°Ordre', style: 'labelCell',alignment: 'center' },
                // { text: this.ofInternForm.get('numberOF')?.value || '', style: 'valueCell', alignment: 'center' },
                { text: this.article?.numberDessin || '', style: 'valueCell', alignment: 'center' },
                { text: this.article?.identifiantSomatel || '', style: 'valueCell', alignment: 'center' },
                { text: this.article?.identifiant || '', style: 'valueCell', alignment: 'center' },
              ],
            ]


          },
          layout: { hLineWidth: (i, node) => i === node.table.body.length ? 0 : 1, vLineWidth: () => 1, hLineColor: () => 'black', vLineColor: () => 'black' }
        },
        {
          table: {
            widths: [30,61, '*', 50, 450],
            body: [
              [
                { text: 'Engin', style: 'labelCell' },
                { text: `Projet de: ${this.of.projectOf}`, style: 'labelCell' },
                { text: 'DATE', style: 'labelCell', alignment: 'center' },
                { text: 'QUANTITE', style: 'labelCell', alignment: 'center' },
                { text: `Dernière modification:`, style: 'labelCell' },
                // { text: 'ORG 000', style: 'valueCell', alignment: 'center' },
              ],
              [
                { text: this.article?.engins?.[0]?.codeEngin || '', style: 'valueCell', bold: true },
                { text: this.of.rc || '', style: 'valueCell' },
                { text: formatDate(this.ofInternForm.get('date')?.value), style: 'valueCell', alignment: 'center' },
                { text: this.ofInternForm.get('quantity')?.value?.toString().padStart(2, '0') || '01', style: 'quantityCell', alignment: 'center', fontSize: 18, bold: true },
                { text: `Nouvelle modification:`, style: 'labelCell' },
                // { text: '', style: 'valueCell', alignment: 'center' },
              ]
            ]
          },
          layout: { hLineWidth: (i, node) => i === node.table.body.length ? 0 : 1, vLineWidth: () => 1, hLineColor: () => 'black', vLineColor: () => 'black' }
        },
        // { text: '', margin: [0, 5, 0, 0] },
        {
          table: {
            headerRows: 1,
            widths: [30, 61, 30, 30, 40, 38, 509],
            body: [
              [
                { text: 'Phase', style: 'opHeaderCell', alignment: 'center' },
                { text: 'Poste de travail', style: 'opHeaderCell', alignment: 'center' },
                { text: 'Tp.m', style: 'opHeaderCell', alignment: 'center' },
                { text: 'Tr', style: 'opHeaderCell', alignment: 'center' },
                { text: 'Te', style: 'opHeaderCell', alignment: 'center' },
                // { text: 'L', style: 'opHeaderCell', alignment: 'center' },
                { text: 'ST', style: 'opHeaderCell', alignment: 'center' },
                { text: 'Suite d\'opérations', style: 'opHeaderCell', alignment: 'center' }
              ],
              ...operationsRows
            ]
          },
          layout: { hLineWidth: () => 1, vLineWidth: () => 1, hLineColor: () => 'black', vLineColor: () => 'black' }
        }
      ],

      styles: {
        mainHeader: { fontSize: 22, bold: true, alignment: 'left' },
        headerCell: { fontSize: 10, bold: true, fillColor: '#ffffff' },
        labelCell: { fontSize: 9, fillColor: '#ffffff' },
        valueCell: { fontSize: 9, fillColor: '#ffffff' },
        quantityCell: { fontSize: 18, bold: true, fillColor: '#ffffff' },
        opHeaderCell: { fontSize: 9, bold: true, fillColor: '#f0f0f0' },
        tableCell: { fontSize: 9 },
        operationName: { fontSize: 9, bold: true },
        operationCell: { fontSize: 8 }
      }
    };

    pdfmake.createPdf(docDefinition).download(`GAMME-${this.article?.identifiant || 'operation'}.pdf`);
  }

  printBon() {
    if (!this.ofId) {
      this.toastr.error('Veuillez charger un OF avant d\'imprimer', '', { toastClass: 'toastr-error' });
      return;
    }

    this._ofService.getBonDeSalaire({ ofid: this.ofId }).subscribe(dto => {
      this._generateBonPdf(dto);
    }, () => {
      this.toastr.error('Erreur lors de la récupération des données', '', { toastClass: 'toastr-error' });
    });
  }

  private _generateBonPdf(dto: import('src/api-v2/of-intern/models/of-intern-dto').OfInternDto) {
    const article = dto.of?.article;
    const workstation = dto.posteDeTravail;
    const suiviOfs = dto.suiviOf || [];

    const bonSlips = suiviOfs.map((op: SuiviOf, index: number) => {
      const workstationCode = workstation ? workstation.codeWorkstation : '';
      const workstationParts = workstationCode.split('/');
      const cfGaop = workstationParts.length >= 2 ? `${workstationParts[0]} ${workstationParts[1]}` : workstationCode;

      return [

        {
          table: {
            widths: ['*', 50, 30, 55, 50, 50, 70, 70, 60, 55, 20, 50],
            body: [
              [
                { text: 'N°d\'identification', style: 'articleName', alignment: 'center' },
                { text: 'N°d\'étude', style: 'articleName', alignment: 'center' },
                { text: 'Prép.', style: 'articleName', alignment: 'center' },
                { text: 'Début travail', style: 'articleName', alignment: 'center' },
                { text: 'fin travail', style: 'articleName', alignment: 'center' },
                { text: 'N°d\'ordre', style: 'articleName', alignment: 'center' },
                { text: 'Qte de lancement', style: 'articleName', alignment: 'center' },
                { text: 'Centre de frais', style: 'articleName', alignment: 'center' },
                { text: 'lieu de stockage', style: 'articleName', alignment: 'center' },
                { text: 'Date d\'emissi', style: 'articleName', alignment: 'center' },
                { text: 'U', style: 'articleName', alignment: 'center' },
                // { text: 'CC', style: 'articleName', alignment: 'center' },
                { text: 'N°d\'ordre', style: 'articleName', alignment: 'center' }
              ],
              [
                { text: article?.identifiantSomatel || '', style: 'articleName', alignment: 'center' },
                { text: '', style: 'articleName', alignment: 'center' },
                { text: '', style: 'articleName', alignment: 'center' },
                { text: '', style: 'articleName', alignment: 'center' },
                { text: '', style: 'articleName', alignment: 'center' },
                { text: '', style: 'articleName', alignment: 'center' },
                { text: this.ofInternForm.get('quantity')?.value || '1', style: 'articleName', alignment: 'center' },
                { text: '', style: 'articleName', alignment: 'center' },
                { text: '', style: 'articleName', alignment: 'center' },
                { text: '', style: 'articleName', alignment: 'center' },
                { text: '', style: 'articleName', alignment: 'center' },
                // { text: '', style: 'articleName', alignment: 'center' },
                { text: '1/1', style: 'articleName', alignment: 'center' }
              ]
            ]
          },
          layout: { hLineWidth: (i, node) => i === node.table.body.length ? 0 : 1, vLineWidth: () => 1, hLineColor: () => 'black', vLineColor: () => 'black' }
        },
        {
          table: {
            widths: ['*'],
            heights: [30],
            body: [[
              { text: article?.libelleFR || '', style: 'articleNameVal', margin: [0, 10, 0, 0], bold: true },
              // { text: article?.identifiant || '', style: 'smallValue', alignment: 'center' },
              // { text: `N°d'ordre`, style: 'tinyText', alignment: 'center' }
            ]]
          },
          layout: { hLineWidth: (i, node) => i === node.table.body.length ? 0 : 1, vLineWidth: () => 1, hLineColor: () => 'black', vLineColor: () => 'black' }
        },
        (() => {
          const travailleurs = op.travailleurs || [];
          const N = travailleurs.length;
          const operRowCount = Math.max(N - 1, 1);
          const totalRows = 2 + operRowCount;
          const first = travailleurs[0];
          const remaining = travailleurs.slice(1);

          const headerRow = [
            { text: 'U', style: 'articleName', alignment: 'center' },
            { text: 'S.O.', style: 'articleName', alignment: 'center' },
            { text: 'Centre de frais', style: 'articleName', alignment: 'center' },
            { text: 'G.S.', style: 'articleName', alignment: 'center' },
            { text: 'T.p.m', style: 'articleName', alignment: 'center' },
            { text: 'tr', style: 'articleName', alignment: 'center' },
            { text: 'te', style: 'articleName', alignment: 'center' },
            { text: 'Lm', style: 'articleName', alignment: 'center' },
            { text: 'Texte', style: 'articleName', alignment: 'center' },
            { text: 'N°personnel', style: 'articleName', alignment: 'center' },
            { text: 'Temps effectif', style: 'articleName', alignment: 'center' },
            { text: 'Quantité', style: 'articleName', alignment: 'center' },
            {
              stack: [
                { text: 'ORDRE', style: 'orderHeader', alignment: 'right', bold: true },
                { text: `NO.ID.SUP  ${article?.identifiant || ''}`, style: 'orderText', alignment: 'right' },
                { text: `NO.IDENT  ${article?.identifiantSomatel || ''}`, style: 'orderText', alignment: 'right' },
                { text: `CF-GAOP  ${cfGaop}`, style: 'orderText', alignment: 'right' },
                { text: `NOP  ${op.pos || ''}`, style: 'orderText', alignment: 'right' },
              ],
              rowSpan: totalRows,
            }
          ];

          const dataRow = [
            { text: article.sortieUnit || '', style: 'articleName', alignment: 'center' },
            { text: op.pos || '', style: 'articleName', alignment: 'center' },
            { text: `${workstation.codeWorkstation} - ${workstation.libelle}`, style: 'articleName', alignment: 'center' },
            { text: op.gs || '', style: 'articleName', alignment: 'center' },
            { text: `${(op.executionTime * dto.of.quantity + op.preparationTime) / dto.of.quantity}`, style: 'articleName', alignment: 'center' },
            { text: op.preparationTime || '', style: 'articleName', alignment: 'center' },
            { text: op.executionTime || '', style: 'articleName', alignment: 'center' },
            { text: '', style: 'articleName', alignment: 'center' },
            { text: op.operation?.toUpperCase() || '', style: 'operationText', alignment: 'center' },
            { text: first ? `${first.travailleur?.codeTravailleur} - ${first.travailleur?.libelle}` : '', style: 'articleName', alignment: 'center' },
            { text: first?.tempEffectif ?? '', style: 'articleName', alignment: 'center' },
            { text: first?.quantite ?? '', style: 'articleName', alignment: 'center' },
            {}
          ];

          const operRow = [
            {
              text: `${op.operation || ''} \n${op.operationDetail ? op.operationDetail : ''}`,
              style: 'articleName',
              colSpan: 9,
              rowSpan: operRowCount,
              alignment: 'center',
              margin: [4, 4, 4, 4]
            },
            {}, {}, {}, {}, {}, {}, {}, {},
            { text: remaining[0] ? `${remaining[0].travailleur?.codeTravailleur} - ${remaining[0].travailleur?.libelle}` : '', style: 'articleName', alignment: 'center' },
            { text: remaining[0]?.tempEffectif ?? '', style: 'articleName', alignment: 'center' },
            { text: remaining[0]?.quantite ?? '', style: 'articleName', alignment: 'center' },
            {}
          ];

          const extraRows = remaining.slice(1).map(t => [
            {}, {}, {}, {}, {}, {}, {}, {}, {},
            { text: `${t.travailleur?.codeTravailleur} - ${t.travailleur?.libelle}`, style: 'articleName', alignment: 'center' },
            { text: t.tempEffectif ?? '', style: 'articleName', alignment: 'center' },
            { text: t.quantite ?? '', style: 'articleName', alignment: 'center' },
            {}
          ]);

          return {
            table: {
              widths: [20, 30, 80, 40, 25, 25, 25, 25, 80, '*', 35, 35, 100],
              body: [headerRow, dataRow, operRow, ...extraRows]
            },
            layout: { hLineWidth: (i: any, node: any) => i === node.table.body.length ? 0 : 1, vLineWidth: () => 1, hLineColor: () => 'black', vLineColor: () => 'black' }
          };
        })(),
        {
          table: {
            widths: [80, 80, 90, 90, 70, 55, 50, 85, '*'],
            body: [
              [
                { text: 'TS', style: 'articleName', alignment: 'center' },
                { text: 'Nat.frais gen', style: 'articleName', alignment: 'center' },
                { text: 'C.d.f-Poste de travail', style: 'articleName', alignment: 'center' },
                { text: 'Piéce A.V.S', style: 'articleName', alignment: 'center' },
                { text: 'Pr. UT', style: 'articleName', alignment: 'center' },
                { text: 'Taux d\'activité', style: 'articleName', alignment: 'center' },
                { text: 'Reb.mat.', style: 'articleName', alignment: 'center' },
                { text: 'Reb.us.', style: 'articleName', alignment: 'center' },
                { text: 'Pieces bonnes', style: 'articleName', alignment: 'center' }
              ],
              [
                { text: '\n\n', style: 'articleName', alignment: 'center' },
                { text: '\n\n', style: 'articleName', alignment: 'center' },
                { text: '\n\n', style: 'articleName', alignment: 'center' },
                { text: '\n\n', style: 'articleName', alignment: 'center' },
                { text: '\n\n', style: 'articleName', alignment: 'center' },
                { text: '\n\n', style: 'articleName', alignment: 'center' },
                { text: '\n\n', style: 'articleName', alignment: 'center' },
                { text: '\n\n', style: 'articleName', alignment: 'center' },
                { text: '\n\n', style: 'articleName', alignment: 'center' }
              ]
            ]
          },
          layout: { hLineWidth: (i: any, node: any) => i === node.table.body.length ? 0 : 1, vLineWidth: () => 1, hLineColor: () => 'black', vLineColor: () => 'black' }
        },
        {
          table: {
            widths: [150, '*', 80, 80, 80, 100],
            body: [[
              { text: 'EPE/SOMATEL-LIEBHERR', style: 'articleNameVal', margin: [5, 5, 0, 0], bold: true },
              { text: 'BON DE SALAIRE', style: 'articleNameVal', margin: [0, 5, 0, 0], alignment: 'center', bold: true },
              { text: '\n\nPréparé le / de', style: 'smallText', alignment: 'center' },
              { text: '\n\nControlé le / de', style: 'smallText', alignment: 'center' },
              { text: '\n\nPerforé / vérifié', style: 'smallText', alignment: 'center' },
              { text: 'AVIS DE FINITION', style: 'articleNameVal', margin: [0, 5, 0, 0], alignment: 'center', bold: true }
            ]]
          },
          layout: { hLineWidth: () => 1, vLineWidth: () => 1, hLineColor: () => 'black', vLineColor: () => 'black' }
        },
        index < this.dataSource.length - 1 ? { text: '', pageBreak: 'after' } : {}
      ];
    });

    const docDefinition: any = {
      pageSize: 'A4',
      pageOrientation: 'landscape',
      pageMargins: [15, 15, 15, 15],
      content: bonSlips.flat(),
      styles: {
        headerTitle: { fontSize: 11, bold: true },
        smallText: { fontSize: 7 },
        tinyText: { fontSize: 6 },
        smallValue: { fontSize: 8 },
        valueCell: { fontSize: 8 },
        articleName: { fontSize: 10 },
        articleNameVal: { fontSize: 12, bold: true },
        operationText: { fontSize: 7, bold: true },
        descriptionText: { fontSize: 8 },
        orderHeader: { fontSize: 9, bold: true },
        orderText: { fontSize: 8 }
      }
    };

    pdfmake.createPdf(docDefinition).download(`BON-SALAIRE-${this.article?.identifiant || 'operation'}.pdf`);
  }
}