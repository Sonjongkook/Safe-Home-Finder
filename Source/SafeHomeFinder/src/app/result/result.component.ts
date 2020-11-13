import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private _apiService: ApiService) {
  }

  /* list for great schools*/
  schools_list = [];

  /* list for zillow houses */
  home_list = [];

  /* list for FBI crime rates */
  crime_list: any;


  ngOnInit(): void {
    /* getting schools data from great schools api */
    this._apiService.getSchools().subscribe(data => this.schools_list = data.schools.school);


    /* getting house info from zillow rapidapi's */
    fetch('https://zillow-free.p.rapidapi.com/properties/zipcode/64133?min_price=0&page=1&max_price=0', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '90ef9ea20cmsh133dddc56df0deep178293jsnada2d7c2b39a',
        'x-rapidapi-host': 'zillow-free.p.rapidapi.com'
      }
    })
      .then(response => {
        return response.json().then((data) => {
          console.log(data);
          this.home_list = data.result;
        }).catch(err => {
          console.error(err);
        });
      });

    /* getting crime data from fbi crime api */
    this._apiService.getCrimes(this.stateVal)
      .subscribe((responses: any) => {
        this.crime_list = Object.keys(responses.data).map(function (k) {
          var i = responses.data[k];
          return {value: i.value, year: i.data_year, type: i.key};
        });
      });
  }

}
