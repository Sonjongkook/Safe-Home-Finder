import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import { Observable} from 'rxjs';
import firebase from 'firebase';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;
  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = firebaseAuth.authState;
  }

  // checkUser(status): void{
  //   this.firebaseAuth.onAuthStateChanged((user) =>{
  //     if(user){
  //       status.next(true);
  //     }else{
  //       status.next(false);
  //     }
  //   });
  // }

  // Sign up functionality
  signup(email: string, password: string): void {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        window.alert('Success!' + value);
        this.router.navigate(['login']);
      })
      .catch(err => {
        window.alert('Something went wrong:' + err.message);
        this.router.navigate(['login']);
      });
  }


  // login and move to home
  login(email: string, password: string, loginstatus: boolean): void {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        window.alert('Nice, it worked!');
        this.router.navigate(['home']);
      })
      .catch(err => {
        window.alert('Something went wrong:' + err.message);
        this.router.navigate(['login']);
      });
  }

  // log out and move to the login page again
  logout(): void {
    // If logout make email initialize
    this.firebaseAuth.signOut();
    this.router.navigate(['about'])
  }




}
