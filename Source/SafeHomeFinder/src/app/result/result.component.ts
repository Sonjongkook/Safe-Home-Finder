import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {DataService} from '../data.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private _apiService: ApiService, private dataService: DataService) {
  }

  //private Zillow_API = 'c81d24b394mshc408f494c11731dp14a2d9jsna66cfaba7a6c'; // Sandy's Zillow API Key

  /* list for great schools*/
  schools_list = [];

  /* list for zillow houses */
  home_list = [];

  /* list for FBI crime rates */
  crime_list: any;


  ngOnInit(): void {
    // Variables accessed from Data Service Component.
    // Printing to console for Verification.
    console.log('Result Component: ' + this.dataService.sharedAddress);
    console.log('Result Component: ' + this.dataService.sharedCity);
    console.log('Result Component: ' + this.dataService.sharedState);
    console.log('Result Component: ' + this.dataService.sharedZipcode);

    /* Great Schools API call */
    this._apiService.getSchools().subscribe(data => this.schools_list = data.schools.school);

    /* Zillow Rapid API call
    * Parameters: Zillow_API
    * --Plan to have this take in an address to pull the details information on house, schools, and any crimes.
    * --Will need to use a different api fetch url for address search */
    fetch('https://zillow-free.p.rapidapi.com/properties/zipcode/64133?min_price=0&page=1&max_price=0', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': this.Zillow_API,
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

    /* Need to fix this Socrata API
    * --Possible plan to show crimes within 5 mile radius
    * --Socrata ODN only has crime data on limited areas */
    this._apiService.getSocrataCrimes()
      .subscribe((responses: any) => {
        this.crime_list = Object.keys(responses).map(function (k) {
          var i = responses[k];
          return {reported_date: i.reported_date, address: i.address, description: i.description};
        });

      });
  }
}
