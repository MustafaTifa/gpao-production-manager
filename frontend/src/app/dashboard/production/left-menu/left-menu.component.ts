import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageUtil } from 'src/app/shared/utils/util.storage';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {
  activeLinkGroupName: string = 'article';
  menuForceExpanded$ = StorageUtil.menuForceExpanded$
  // .pipe(
  //   tap((res) => console.log('menu expanded', res))
  // );
  private readonly allLinks = [
    { name: 'OF Interne', url: 'of_intern', icon: 'assignment_add' },
    { name: 'Suivi OF Interne', url: 'suivi_of_intern', icon: 'assignment_turned_in' },
    { name: 'OF Externe', url: 'of_extern', icon: 'exit_to_app' },
    { name: 'Suivi OF Externe', url: 'suivi_of_extern', icon: 'production_quantity_limits' },
    { name: 'Suivi Production', url: 'suivi_production', icon: 'schedule' },
  ];

  public links = [...this.allLinks];

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    console.log('illllink rod : ',this.router.url,this.router.url.substring(1));
    this.setActiveLinkGroupName(this.router.url.substring(1).split('/')[1]);
    this.filterLinksByPermissions();
  }

  private filterLinksByPermissions(): void {
    const isAdmin = this.authService.getRoles().includes('ROLE_ADMIN');
    if (isAdmin) {
      this.links = [...this.allLinks];
      return;
    }
    const permissions = this.authService.getPermissions();
    this.links = this.allLinks.filter(link =>
      permissions.some(p => p.route.includes(link.url) || p.route === link.url)
    );
  }

  public onLinkClick(link): void {
    this.activeLinkGroupName = link.url;
  }

  private setActiveLinkGroupName(linkName: string): void {
    
    this.activeLinkGroupName = linkName
  }

}
