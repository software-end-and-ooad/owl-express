import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    id: number;
}
export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'ส่งของ',  icon: 'dashboard', id: 0 },
    { path: 'account', title: 'รายละเอียดบัญชี',  icon:'person', id: 1 },
    { path: 'mysql-manage', title: 'จัดการ MySQL',  icon:'content_paste', id: 2 },
    { path: 'ftp-manage', title: 'การเข้าถึงแบบ FTP',  icon:'library_books', id: 3 },
    { path: 'notifications', title: 'การแจ้งเตือน',  icon:'notifications', id: 4 },
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
