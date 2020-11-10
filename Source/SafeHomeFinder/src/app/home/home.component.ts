import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  /* list for great schools */
  schools_list = [];

  /* list for zillow houses */
  home_list = [];

  /* list for socrata odn crime rates */
  crime_list = [];

  constructor(private _apiService: ApiService) {
  }

  ngOnInit(): void {

    /* getting schools data from great schools api */
    this._apiService.getSchools().subscribe(data => this.schools_list = data.schools.school);
    console.log('This is the Great Schools API results: ' + JSON.stringify(this.schools_list));

    /* getting house info from zillow rapidapi's */
    fetch('https://zillow-free.p.rapidapi.com/properties/zipcode/64133?min_price=0&page=1&max_price=0', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '',
        'x-rapidapi-host': 'zillow-free.p.rapidapi.com'
      }
    })
      .then(response => {
        return response.json().then((data) => {
          this.home_list = data.result;
          console.log('This is the zillow API results: ' + JSON.stringify(this.home_list));
        }).catch(err => {
          console.error(err);
        });
      });

    /* getting crime data from fbi crime api */
    this._apiService.getCrimes().subscribe(data => this.crime_list = data.keys);
    console.log('This is the FBI crime API results: ' + JSON.stringify(this.crime_list));

  }
}
