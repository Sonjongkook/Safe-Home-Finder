import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent{
  user$: Observable<any>;
  navbarOpen = false;

  constructor(private authService: AuthService) {
    this.user$ = authService.user;
  }

  logout(){
    this.authService.logout();
    window.alert("You are logged out")
    localStorage.clear();
  }

  toggleNavbar(): void {
    this.navbarOpen = !this.navbarOpen;
  };

}
