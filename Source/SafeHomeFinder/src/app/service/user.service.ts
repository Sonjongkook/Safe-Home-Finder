import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {User} from '../model/user.model';
import {Observable} from 'rxjs';
import {House} from '../model/house.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<any[]>;
  houses: Observable<any[]>;
  id: string;
  final_id: string;
  Email: string;

  constructor(private db: AngularFirestore) {
    this.Email = localStorage.getItem('email');
    // User collection of users
    this.users = this.db.collection('User', ref => ref.where("email", "==", this.Email)).valueChanges();
  }

  // this method takes an House object and
  // add a new employee to Firestore database collection
  addUser(user: User) {
    // convert object of type Employee to JSON object
    // because Firestore understand JSON
    const userObject = {...user};
    return this.db.collection('User').add(userObject);
  }

  // this method returns list Users
  // fetched from Firestore database collection
  getUser() {
    return this.users;
  }
  // this method returns list Houses
  // fetched from Firestore database collection
  // Todo: Update this to make it synchronized
  getHouse(){
    console.log(this.Email);
    this.db.collection('User', ref => ref.where("email", "==", this.Email)).snapshotChanges().subscribe((res:any) =>{
      console.log(res[0].payload.doc);
      this.id = res[0].payload.doc.id;
      localStorage.setItem('id', this.id);
      return;
    })

    this.houses =  this.db.collection('User/' + localStorage.getItem('id') + '/House').valueChanges();
    console.log(this.houses.forEach(d => console.log(d)));
    return this.houses;

  }


  updateUser(user: User) {
    const userObject = {...user};
    this.db.doc('User/' + user.name).update(userObject);
  }

  deleteUser(UserId: string) {
    this.db.doc('User/' + UserId).delete();
  }

}







