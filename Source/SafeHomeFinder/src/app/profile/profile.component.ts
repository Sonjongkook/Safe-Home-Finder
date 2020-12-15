import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {UserService} from '../service/user.service';
import {House} from '../model/house.model';
import {User} from '../model/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private db: AngularFirestore, private userService: UserService) {}

  users: User[];
  houses: House[];

  ngOnInit(): void {

    this.userService.getUser().subscribe(users => {

      this.users = users;
      // console.log(this.users);
    });

    this.userService.getHouse().subscribe(houses => {
      this.houses = houses;
      // console.log(this.houses);

    });


  }

}
