import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {UserService} from '../service/user.service';
import {House} from '../model/house.model';
import {User} from '../model/user.model';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private db: AngularFirestore, private userService: UserService) {}

  users: any[];
  houses: House[];
  private updateSubscription: Subscription;

  ngOnInit(): void {
    this.userService.getUser().subscribe(users => {
      this.users = users;
    });

    this.updateSubscription = interval(1000).subscribe(
      (val) => {
        this.userService.getHouse().subscribe(houses => {
          this.houses = houses;
        });
      });
  }
}
