import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

export interface StockItem {
  reference: string;
  designation: string;
  quantiteDemandee: number;
  quantiteStock: number;
  difference: number;
}

@Component({
  selector: 'app-stock-check-dialog',
  templateUrl: './stock-check-dialog.component.html',
  styleUrls: ['./stock-check-dialog.component.scss']
})
export class StockCheckDialogComponent implements OnInit {

  stockItems: StockItem[] = [];
  loading = true;
  error: string | null = null;
  displayedColumns = ['reference', 'designation', 'quantiteDemandee', 'quantiteStock', 'difference'];

  constructor(
    public dialogRef: MatDialogRef<StockCheckDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { articles: any[] },
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const payload: string[] = this.data.articles.map(item => item.article.identifiant);

    this.http.post<{ code: string; quantite: number }[]>(environment.API_STOCK, payload).subscribe({
      next: (res) => {
        this.stockItems = this.data.articles.map(item => {
          const stockEntry = res.find(s => s.code === item.article.identifiant);
          console.log('stockEntry : ',stockEntry);
          const quantiteDemandee = item.quantity;
          const quantiteStock = stockEntry ? stockEntry.quantite : 0;
          return {
            reference: item.article.identifiant,
            designation: item.article.libelleFR,
            quantiteDemandee,
            quantiteStock: stockEntry.quantite,
            difference: quantiteDemandee - quantiteStock
          };
        });
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message || 'Erreur lors de la vérification du stock';
        this.loading = false;
      }
    });
  }

  isManquant(item: StockItem): boolean {
    return item.difference < 0;
  }
}