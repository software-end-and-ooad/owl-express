import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    id: number;
}
export const ROUTES: RouteInfo[] = [
    { path: 'order-list', title: 'รายการของ',  icon: 'dashboard', id: 0 },
    { path: 'order-package', title: 'ส่งของ',  icon:'person', id: 1 },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  selectedMenu: number = 0;

  constructor() { }

  ngOnInit() {
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
