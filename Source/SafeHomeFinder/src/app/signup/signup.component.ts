import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth.service';
import {User} from '../model/user.model';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  // Todo: make a authentication and User

  // Inputs from user
  name: string;
  email: string;
  password: string;
  con_password: string;

  user: User = new User();

  constructor(public authService: AuthService, public userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  signup() {
    // Create User database
    this.user.name = this.name;
    this.user.email = this.email;
    this.userService.addUser(this.user);
    // Auth Service
    this.authService.signup(this.email, this.password);
    // initialze email and password
    this.email = this.password = '';
    this.router.navigate(['/login']);
  }
}
