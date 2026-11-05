import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserUtilService } from 'src/app/shared/utils/browser.util.service';
import { StorageUtil } from 'src/app/shared/utils/util.storage';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  public links = [
    { name: 'Fichier', url: 'fichier'},
    { name: 'Production', url: 'production'},
  ]
  activeLinkGroupName: string = '';

  constructor(private browserUtilService: BrowserUtilService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    console.log('this.router.url : ',this.router.url);
    this.setActiveLinkGroupName(this.router.url.substring(1).includes('fichier') ? 'fichier' : this.router.url.substring(1))//.substr(16);
  }

  public onLinkClick(link): void {
    console.log('this.router.url link: ',link);
    this.activeLinkGroupName = link.url;
  }

  private setActiveLinkGroupName(linkName: string): void {
    
    this.activeLinkGroupName = linkName
  }

  forceToggleLeftMenu() {
    StorageUtil.toggleForceExpanded();
    this.browserUtilService.triggerResize(300)
  }

  get isAdmin(): boolean {
    return this.authService.getRoles().includes('ROLE_ADMIN');
  }

  logout(): void {
    this.authService.logout();
  }

}
