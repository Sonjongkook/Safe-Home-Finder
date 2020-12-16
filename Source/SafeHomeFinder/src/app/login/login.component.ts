import {Component, OnInit} from '@angular/core';
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

  async login() {
    await this.authService.login(this.email, this.password, this.LoginStatus);
    //initialze email and password
    this.email = this.password = '';
  }

  async logout() {
    await this.authService.logout();
    await localStorage.clear();
  }

  moveToSignup(){
    this.router.navigate(["signup"])
  }

  ngOnInit(): void {
  }

}
