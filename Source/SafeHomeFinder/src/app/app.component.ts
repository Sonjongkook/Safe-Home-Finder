import {Component, OnInit} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
  title = 'SafeHomeFinder';
  ShowFlag: boolean;
  constructor(router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.ShowFlag = event.url !== '/login';
      }
    });
  }

}
