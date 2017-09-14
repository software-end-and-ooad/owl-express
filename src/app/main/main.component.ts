import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent {

  @ViewChild('loginModal') public loginModal: ElementRef; // Give to navbar main for open
  @ViewChild('registerModal') public registerModal: ElementRef; // Give to navbar main for open
  transform: string = `translate3d(0px, 0px, 0px)`;
  logoFontSize: number = 18;
  headerHeight: string = '90vh';

  constructor(private router: Router) { }

  onWindowScroll() { // Transform background by scroll position
    this.transform = `translate3d(0px, ${pageYOffset*3/10}px, 0px)`; // Set speed parallax here
  }

  showNavBackground() { // Show and hide navbar background color
    if (pageYOffset > 690) {
      this.logoFontSize = 22;
      return true;
    }
    else {
      this.logoFontSize = 18;
      return false;
    }
  }

  routerIsLogin() {
    if ( this.router.url == '/login' )
      return true;
    else
      return false;
  }

  routerIsRegister() {
    if ( this.router.url == '/register' )
      return true;
    else
      return false;
  }

  routerIsMain() {
    if ( this.router.url == '/' )
      return true;
    else
      return false;
  }

}
