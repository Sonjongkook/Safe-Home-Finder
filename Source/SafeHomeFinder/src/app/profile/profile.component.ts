import { Component, Inject, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {UserService} from '../service/user.service';
import {House} from '../model/house.model';
import {User} from '../model/user.model';
import {interval, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/common'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(@Inject (DOCUMENT) private document: Document, private db: AngularFirestore, private router: Router, private userService: UserService) {}

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

  viewSite(favHouseUrl): void {
    window.location.replace(favHouseUrl);
  }


}
