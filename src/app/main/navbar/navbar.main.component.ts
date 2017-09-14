import { Component } from '@angular/core';
import { MainComponent } from '../main.component'
import { Router } from '@angular/router';


@Component({
  selector: 'main-navbar',
  templateUrl: './navbar.main.component.html',
  styleUrls: ['../../../assets/css/style.css']
})

export class NavbarMainComponent {
  transform: string = `translate3d(0px, 0px, 0px)`;
  logoFontSize: number = 18;

  constructor(private mainComponent: MainComponent, private router: Router) {}

  onWindowScroll() { // Transform background by scroll position
    this.transform = `translate3d(0px, ${pageYOffset*3/10}px, 0px)` // Set speed parallax here
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

  loginModal() {
    return this.mainComponent.loginModal;
  }

  routerIsRegister() {
    if ( this.router.url == '/register' )
      return true;
    else
      return false;
  }

  routerIsLogin() {
    if ( this.router.url == '/login' )
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
