import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Article } from 'src/api-v2/article/models';
import { ArticleService } from 'src/api-v2/article/services/article-management.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HistoriqueComponent implements OnInit {

  @Input() selectedArticle;

  columns = [
    {
      prop: 'version',
      label: 'Version',
      cell: (element: Article) => `${element.version}`,
    },
    {
      prop: 'lastModified',
      label: 'Date',
      cell: (element: Article) => `${this._sharedService.fromJsonDate(element.lastModified)}`,
    },
    {
      prop: 'operation',
      label: 'Opération',
      cell: (element: Article) => `${element.operation}`,
    },

  ];
  displayedColumns = [...this.columns.map(c => c.prop)];
  dataSource = null;

  constructor(public _sharedService: SharedService,
      private toastr: ToastrService,
      private _articleService: ArticleService) { }

  ngOnInit(): void {
    this._sharedService.tabChange$.subscribe(res=> {
      if(res == 4 && this.selectedArticle){
        this.loadDataArticle();
      }
    })
  }

  loadDataArticle() {
    this._articleService.getAllArticlesHistory(this.selectedArticle.id).subscribe(res => {
      this.dataSource = res;
    }, err => {
      console.log('err artcle: ',err);
      this.toastr.error(err?.error?.message,'Erreur', { toastClass: 'toastr-error' });
    })
  }

  tabChanges(tabIndex){
    switch (tabIndex) {
      case 1:
        // this.loadDataArticle();
        break;
      case 2:
        // this.loadDataArticle();
        break;
      case 3:
        break;
      default:
        this.loadDataArticle();
        break;
    }
  }

}
