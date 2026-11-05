import { Component, OnInit } from '@angular/core';
import { StorageUtil } from '../shared/utils/util.storage';
import { tap } from 'rxjs';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }

}
