import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, startWith } from 'rxjs';
import { OfSuiviService } from 'src/api-v2/of-suivi/services/of-suivi-management.service';
import { TravailleurWorkDto } from 'src/api-v2/of-suivi/models/travailleur-work-dto';
import { WorkstationService } from 'src/api-v2/workstation/services/workstation-management.service';
import { Workstation } from 'src/api-v2/workstation/models';
import pdfmake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfmake.vfs = pdfFonts.pdfMake.vfs;

interface TravailleurGroup {
  travailleurId: number;
  codeTravailleur: string;
  travailleurLibelle: string;
  tasks: TravailleurWorkDto[];
  totalHours: number;
  expanded: boolean;
}

@Component({
  selector: 'app-suivi-production',
  templateUrl: './suivi-production.component.html',
  styleUrls: ['./suivi-production.component.scss']
})
export class SuiviProductionComponent implements OnInit {

  filterForm: FormGroup;
  workstations: Workstation[] = [];
  workstationOptions: Observable<Workstation[]>;

  travailleurGroups: TravailleurGroup[] = [];
  totalWorkers = 0;
  totalTasks = 0;
  totalHours = 0;

  loading = false;

  constructor(
    private toastr: ToastrService,
    private _ofSuiviService: OfSuiviService,
    private _workstationService: WorkstationService
  ) { }

  ngOnInit(): void {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1);

    this.filterForm = new FormGroup({
      'startDate': new FormControl(startOfWeek),
      'endDate': new FormControl(today),
      'workstation': new FormControl(null)
    });

    this._workstationService.getAllWorkstations().subscribe(workstations => {
      this.workstations = workstations;
      this.workstationOptions = this.filterForm.get('workstation')?.valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : value?.codeWorkstation;
          return name ? this._filterWorkstations(name as string) : this.workstations.slice();
        }),
      );
    });

    this.loadData();
  }

  private _filterWorkstations(codeWorkstation: string): Workstation[] {
    const filterValue = codeWorkstation.toLowerCase();
    return this.workstations.filter(option =>
      option.codeWorkstation?.toLowerCase().includes(filterValue) ||
      option.libelle?.toLowerCase().includes(filterValue)
    );
  }

  displayFn(workstation: Workstation): string {
    return workstation ? `${workstation.codeWorkstation} - ${workstation.libelle}` : '';
  }

  loadData(): void {
    const startDate = this.filterForm.get('startDate')?.value;
    const endDate = this.filterForm.get('endDate')?.value;
    const workstation = this.filterForm.get('workstation')?.value;

    if (!startDate || !endDate) {
      this.toastr.error('Veuillez sélectionner une période', '', { toastClass: 'toastr-error' });
      return;
    }
    
    this.loading = true;

    const params: any = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    };

    if (workstation?.id) {
      params.workstationId = workstation.id;
    }

    this._ofSuiviService.getWorkByTravailleur(params).subscribe(
      (data: TravailleurWorkDto[]) => {
        this.processData(data);
        this.loading = false;
      },
      err => {
        this.toastr.error('Erreur lors du chargement des données', '', { toastClass: 'toastr-error' });
        this.loading = false;
      }
    );
  }

  private formatDateForApi(date: Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private processData(data: TravailleurWorkDto[]): void {
    const groupMap = new Map<number, TravailleurGroup>();
    console.log('startdatetee : ',data);
    data?.map(item => {
      if (!item.travailleurId) return;

      if (!groupMap.has(item.travailleurId)) {
        groupMap.set(item.travailleurId, {
          travailleurId: item.travailleurId,
          codeTravailleur: item.codeTravailleur || '',
          travailleurLibelle: item.travailleurLibelle || '',
          tasks: [],
          totalHours: 0,
          expanded: true
        });
      }

      const group = groupMap.get(item.travailleurId)!;
      group.tasks.push(item);

      if (item.totalTempEffectif) {
        group.totalHours += item.totalTempEffectif;
      }
    });

    this.travailleurGroups = Array.from(groupMap.values());
    this.totalWorkers = this.travailleurGroups.length;
    this.totalTasks = data.length;
    this.totalHours = this.travailleurGroups.reduce((sum, g) => sum + g.totalHours, 0);
  }

  toggleGroup(group: TravailleurGroup): void {
    group.expanded = !group.expanded;
  }

  getInitials(name: string): string {
    if (!name) return '??';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR');
  }

  formatTime(dateStr: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }

  formatHours(hours: number): string {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}min`;
  }

  exportPdf(): void {
    const startDate = this.formatDate(this.filterForm.get('startDate')?.value);
    const endDate = this.formatDate(this.filterForm.get('endDate')?.value);

    const content: any[] = [
      { text: 'Bons de Salaire - Suivi Production', style: 'header', margin: [0, 0, 0, 10] },
      { text: `Période: ${startDate} au ${endDate}`, style: 'subheader', margin: [0, 0, 0, 20] },
    ];

    this.travailleurGroups.forEach(group => {
      content.push({
        text: `${group.travailleurLibelle}`,
        style: 'workerHeader',
        margin: [0, 15, 0, 5]
      });

      const tableBody = [
        [
          { text: 'N° OF', style: 'tableHeader' },
          { text: 'Opération', style: 'tableHeader' },
          { text: 'Poste de travail', style: 'tableHeader' },
          { text: 'Temps effectif', style: 'tableHeader' }
        ]
      ];

      group.tasks.forEach(task => {
        tableBody.push([
          { text: task.numberOF || '', style: 'tableCell' },
          { text: task.operation || '', style: 'tableCell' },
          { text: task.workstationLibelle || '', style: 'tableCell' },
          { text: task.totalTempEffectif?.toString() || '', style: 'tableCell' }
        ]);
      });

      content.push({
        table: {
          headerRows: 1,
          widths: [60, '*', 120, 60],
          body: tableBody
        },
        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5,
          hLineColor: () => '#cccccc',
          vLineColor: () => '#cccccc'
        }
      });

      content.push({
        text: `Total: ${this.formatHours(group.totalHours)}`,
        style: 'totalRow',
        margin: [0, 5, 0, 0]
      });
    });

    // content.push({
    //   text: 'Récapitulatif Global',
    //   style: 'summaryHeader',
    //   margin: [0, 30, 0, 10]
    // });

    // content.push({
    //   table: {
    //     widths: ['*', '*', '*'],
    //     body: [
    //       [
    //         { text: 'Travailleurs', style: 'summaryLabel', alignment: 'center' },
    //         { text: 'Tâches', style: 'summaryLabel', alignment: 'center' },
    //         { text: 'Heures totales', style: 'summaryLabel', alignment: 'center' }
    //       ],
    //       [
    //         { text: this.totalWorkers.toString(), style: 'summaryValue', alignment: 'center' },
    //         { text: this.totalTasks.toString(), style: 'summaryValue', alignment: 'center' },
    //         { text: this.formatHours(this.totalHours), style: 'summaryValue', alignment: 'center' }
    //       ]
    //     ]
    //   },
    //   layout: {
    //     hLineWidth: () => 1,
    //     vLineWidth: () => 1,
    //     hLineColor: () => '#333333',
    //     vLineColor: () => '#333333'
    //   }
    // });

    const docDefinition: any = {
      pageSize: 'A4',
      pageOrientation: 'landscape',
      pageMargins: [20, 20, 20, 30],
      content: content,
      styles: {
        header: { fontSize: 18, bold: true },
        subheader: { fontSize: 12, color: '#666666' },
        workerHeader: { fontSize: 12, bold: true, fillColor: '#f0f0f0' },
        tableHeader: { fontSize: 9, bold: true, fillColor: '#e0e0e0' },
        tableCell: { fontSize: 8 },
        totalRow: { fontSize: 10, bold: true, alignment: 'right' },
        summaryHeader: { fontSize: 14, bold: true },
        summaryLabel: { fontSize: 10, bold: true, fillColor: '#f5f5f5' },
        summaryValue: { fontSize: 12, bold: true }
      }
    };

    pdfmake.createPdf(docDefinition).download(`suivi-production-${this.formatDateForApi(new Date())}.pdf`);
  }
}
