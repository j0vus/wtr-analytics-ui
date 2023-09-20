import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/core/services/auth.service';
import { AppComponentBase } from 'app/core/shared/AppComponentBase';
import { Router } from 'express';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'Sectors',  icon:'bar_chart', class: '' },
    { path: '/table-list', title: 'Companies',  icon:'pie_chart', class: '' },
    { path: '/typography', title: 'Visitors',  icon:' person', class: '' },
    { path: '/maps', title: 'Location',  icon:'location_on', class: '' },
    { path: '/Settings', title: 'Settings',  icon:'settings', class: '' },
    // { path: '/logout', title: 'logout',  icon:'logout', class: '' },
  
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  implements OnInit {
  menuItems: any[];

  constructor(private auth:AuthService) {
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  onLogOut(){
    this.auth.logout();
    // console.log('logout');
  }
}
