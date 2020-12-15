import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  LoginStatus: boolean;

  constructor(public authService: AuthService, public router: Router) { }

  login() {
    this.authService.login(this.email, this.password, this.LoginStatus);
    //Save this email value to localstorage
    localStorage.setItem("email", this.email);
    //initialze email and password
    this.email = this.password = '';

  }

  logout() {
    this.authService.logout();
    localStorage.clear();

  }

  ngOnInit(): void {
  }

}
