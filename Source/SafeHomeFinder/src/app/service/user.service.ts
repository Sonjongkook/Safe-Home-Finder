import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) {
  }

  // this method takes an House object and
  // add a new employee to Firestore database collection
  addUser(user: User) {
    // convert object of type Employee to JSON object
    // because Firestore understand JSON
    const userObject = {...user};
    return this.firestore.collection('User').add(userObject);
  }

  // this method returns list of employees document,
  // fetched from Firestore database collection
  getUser() {
    return this.firestore.collection('User').snapshotChanges();

  }

  // this method takes an employee object and
  // update an object of employee to the Firestore document
  updateUser(user: User) {
    // convert object of type Employee to JSON object
    // because Firestore understand JSON
    const userObject = {...user};
    this.firestore.doc('User/' + user.name).update(userObject);
  }

  // this method takes an employee Id and
  // delete an employee document from the Firestore collection
  deleteHouse(UserId: string) {
    this.firestore.doc('User/' + UserId).delete();
  }

}







