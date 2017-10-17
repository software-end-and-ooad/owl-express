import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminfooter',
  templateUrl: './footer.admin.component.html',
  styleUrls: ['./footer.admin.component.css']
})
export class AdminFooterComponent implements OnInit {
  test : Date = new Date();

  constructor() { }

  ngOnInit() {
  }

}
