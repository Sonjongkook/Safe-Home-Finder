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
    // User collection of users
  }

  // this method takes an House object and
  // add a new User to Firestore database collection
  addUser(user: User) {
    // convert object of type Employee to JSON object
    // because Firestore understand JSON
    const userObject = {...user};
    return this.db.collection('User').add(userObject);
  }

  // this method returns list Users
  // fetched from Firestore database collection
  getUser() {
    this.Email = localStorage.getItem("email")
    return this.db.collection('User', ref => ref.where("email", "==", this.Email)).valueChanges();
  }
  // this method returns list Houses
  // fetched from Firestore database collection
  getHouse(){
    this.db.collection('User', ref => ref.where("email", "==", this.Email)).snapshotChanges().subscribe((res:any) =>{
      this.id = res[0].payload.doc.id;
      localStorage.setItem('id', this.id);
      return;
    });

    this.houses =  this.db.collection('User/' + localStorage.getItem('id') + '/House').valueChanges();
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







