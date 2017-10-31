import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    id: number;
}
export const ROUTES: RouteInfo[] = [
    { path: 'manage-user', title: 'Manage',  icon: 'dashboard', id: 0 },
    { path: 'manage-order', title: 'Order',  icon:'person', id: 1 },
    { path: 'manage-member', title: 'ผู้ดูแลระบบ',  icon:'person', id: 1 },
];

export const OFFICER_ROUTES: RouteInfo[] = [
    { path: 'manage-order', title: 'Order',  icon:'person', id: 1 },
];

@Component({
  selector: 'app-adminsidebar',
  templateUrl: './sidebar.admin.component.html',
  styleUrls: ['./sidebar.admin.component.css']
})
export class AdminSidebarComponent implements OnInit {
  menuItems: any[];
  selectedMenu: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.router.url.search('officer') > -1)
      this.menuItems = OFFICER_ROUTES.filter(menuItem => menuItem);
    else
      this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  selectedItem(item) {
    this.selectedMenu = item
  }

  isMobileMenu() {
      if (window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
