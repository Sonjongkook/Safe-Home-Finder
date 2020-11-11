import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  /* list for great schools
  schools_list = []; */

  /* list for zillow houses */
  home_list = [];

  /* list for FBI crime rates */
  crime_list: any;

  constructor(private _apiService: ApiService) {
  }

  ngOnInit(): void {
    /* getting schools data from great schools api
    this._apiService.getSchools().subscribe(data => this.schools_list = data.schools.school); */

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
          console.log('Fetching of RAPID API works"');
          this.home_list = data.result;
        }).catch(err => {
          console.error(err);
        });
      });

    /* getting crime data from fbi crime api */
    this._apiService.getCrimes()
      .subscribe((responses: any) => {
        this.crime_list = Object.keys(responses.data).map(function (k) {
          var i = responses.data[k];
          return {value: i.value, year: i.data_year, type: i.key};
        });
      });
  }
}
