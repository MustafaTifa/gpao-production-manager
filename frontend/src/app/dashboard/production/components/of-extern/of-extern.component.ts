import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OfExtern } from 'src/api-v2/of-extern/models';
import { OfExternService } from 'src/api-v2/of-extern/services/of-extern-management.service';
import { DeleteComponentComponent } from 'src/app/shared/delete-component/delete-component.component';
import { ACTIONS } from 'src/app/shared/enum/Actions.enum';
import { SharedService } from 'src/app/shared/shared.service';
import { Actions } from 'src/app/shared/table/table.component';
import pdfmake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfmake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-of-extern',
  templateUrl: './of-extern.component.html',
  styleUrls: ['./of-extern.component.scss']
})
export class OfExternComponent implements OnInit {

  columns = [
    {
      prop: 'numberOF',
      label: 'N° OF',
      cell: (element: OfExtern) => `${element.numberOF}`,
    },
    {
      prop: 'date',
      label: 'Date',
      cell: (element: OfExtern) => `${this._sharedService.toDate(element.date)}`,
    },
    {
      prop: 'delai',
      label: 'Délai de réalisation',
      cell: (element: OfExtern) => `${element.numberOF}`,
    },
  ];

  actions: Actions[] = [
    {
      icon: 'delete',
      name: 'delete'
    },
    {
      icon: 'post_add',
      name: 'add_article',
      tooltip: 'Ajouter des pieces unitaire'
    }
  ]
  dataSource = null;
  displayedColumns = [...this.columns.map(c => c.prop), 'action'];
  ofExternForm: FormGroup;
  action: ACTIONS = ACTIONS.CREATE;
  defaultPageSize = 10;
  public resultsLength: any = 0;
  disablePrint: boolean = true;

  constructor(private _ofService: OfExternService,
    public _sharedService: SharedService,
    public dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    const pipe = new DatePipe('en-US');

    this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize });
    this.ofExternForm = new FormGroup({
      'id': new FormControl(),
      'numberOF': new FormControl(null, Validators.required),
      'delai': new FormControl(null, Validators.required),
      'date': new FormControl(null, Validators.required),
      'bonDeCommande': new FormControl(null),
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
    this._ofService.getAllOfExterns$Response({
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
    this.ofExternForm.reset();
    this.disablePrint = true;
    this.action = ACTIONS.CREATE
  }

  onSubmit() {
    if (this.action == ACTIONS.CREATE) {
      this.createOFExterne(this.ofExternForm.value);
    } else {
      this.updateOFExterne(this.ofExternForm.value);
    }
  }

  createOFExterne(dataTosSend) {

    console.log('nomenclatureForm : ', dataTosSend);
    this._ofService.addOfExtern(dataTosSend).subscribe(res => {
      this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize });
      this.toastr.success('OF Externe ajouté avec succès', '', { toastClass: 'toastr-success' });
      this.clearFields();
    }, err => {
      console.log('err : ', err);

      this.toastr.error(err?.error?.message, 'Erreur', { toastClass: 'toastr-error' });
    })
  }

  updateOFExterne(dataTosSend) {
    this._ofService.updateOfExtern(dataTosSend).subscribe(res => {
      console.log('res : ', res);
      this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize });
      this.toastr.success('OFExterne modifié avec succès', '', { toastClass: 'toastr-success' });
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
          description: `OF à supprimer: ${event.data.numberOF}`,
        },
      });
      dialogRef.afterClosed().subscribe((data) => {
        if (data) {
          this._ofService.deleteOfExtern(event.data.id).subscribe(res => {
            this.loadData({ pageIndex: 0, pageSize: this.defaultPageSize });
            this.toastr.success('Article supprimé avec succès', '', { toastClass: 'toastr-success' });
            this.clearFields();
          }, err => {
            this.toastr.error(err?.error?.message, 'Erreur', { toastClass: 'toastr-error' });
          })
        }
      });
    } else if (event.action.name == ACTIONS.ADD_ARTICLE) {
      this.router.navigate([`/production/of_extern/piece_unitaire`, event.data.id, event.data.numberOF])
    } else {
      delete event.data.createDate
      // let art = [...event.data.article]
      console.log('this.articleFrom : ', event.data.article);
      this.ofExternForm.setValue(event.data)
      this.disablePrint = false;
      this.action = ACTIONS.UPDATE;
    }
  }

  disableInput(event: Event): void {
    event.preventDefault();
  }

  printOF() {
    this._ofService.getOfExternArticleById({
      page: 0,
      size: 10000,
      id: this.ofExternForm.get('id').value
    }).subscribe(res => {
      console.log('res --: ', res);
      this.createOF(res)
    })
  }

  createOF(articles) {
    const docDefinition = {

      content: [
        { text: `Document OF Externe N° ${this.ofExternForm.get('numberOF')?.value}`, style: 'header', alignment: 'center' },
        {
          columns: [
            { width: '*', text: '' },
            {
              width: 'auto',
              table: {
                body: [
                  [
                    { text: "Bon de commande", style: 'tableHeader' },
                    { text: "Date", style: 'tableHeader' },
                    { text: "Délai", style: 'tableHeader' },
                    { text: "OF Externe", style: 'tableHeader' },
                  ],
                  [
                    { text: `${this.ofExternForm.get('numberOF')?.value}`, style: 'tableCell', alignment: 'center' },
                    { text: `${this._sharedService.toDate(this.ofExternForm.get('date')?.value)}`, style: 'tableCell', alignment: 'center' },
                    { text: `${this.ofExternForm.get('delai')?.value}`, style: 'tableCell', alignment: 'center' },
                    { text: this.ofExternForm.get('bonDeCommande')?.value ? `${this.ofExternForm.get('bonDeCommande')?.value}` : '-', style: 'tableCell', alignment: 'center' },
                  ],
                  [
                    {
                      colSpan: 4,
                      style: "tableExample",
                      table: {
                        widths: ['*', '*', '*', '*'],
                        body: [
                          [
                            { text: "Identifiant", style: 'tableHeader' },
                            { text: "Identifiant Somatel", style: 'tableHeader' },
                            { text: "Désignation", style: 'tableHeader' },
                            { text: "Quantité", style: 'tableHeader' },
                          ],
                          ...articles.map(article => {
                            return [
                              { text: `${article.article.identifiant}`, style: 'tableCell', alignment: 'center' },
                              { text: `${article.article.identifiantSomatel}`, style: 'tableCell', alignment: 'center' },
                              { text: `${article.article.libelleFR}`, style: 'tableCell', alignment: 'center' },
                              { text: `${article.quantity}`, style: 'tableCell', alignment: 'center' },
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

    pdfmake.createPdf(docDefinition).download("OF-Externe.pdf");
  }

}
