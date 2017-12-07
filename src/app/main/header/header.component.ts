import { Component, ViewChild, ElementRef } from '@angular/core';
import { MainComponent } from '../main.component';


@Component({
  selector: 'main-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../../assets/css/style.css']
})
export class HeaderComponent {
  @ViewChild('inputTrack') public inputTrack: ElementRef;


  constructor(
    private mainComponent: MainComponent
  ) { }

  getTrackData() {
    this.mainComponent.getTrackData(this.inputTrack.nativeElement.value);
  }

}
