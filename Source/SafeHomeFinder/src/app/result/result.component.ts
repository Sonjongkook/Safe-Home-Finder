import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {DataService} from '../data.service';
import {Chart} from 'node_modules/chart.js';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private _apiService: ApiService, private dataService: DataService) {
  }

  private Zillow_API = '';  ///////// This is where the ZILLOW API KEY GOES ////////////////

  /* list for great schools*/
  schools_list: any;

  /* list for zillow houses */
  home_list = [];
  nearby_houses = [];

  /* Variables for Socrata data*/
  crime_chart = [];
  crime_count = [];

  /* Variables for Socrata charts */
  chart: [];
  colors = [];

  ngOnInit(): void {
    // Testing
     //this.dataService.sharedState = 'MO';
     //this.dataService.sharedLat = '39.092882';
     //this.dataService.sharedLong = '-94.576823';
     //this.dataService.sharedZipcode = '64133';


    if (this.dataService.sharedZipcode !== undefined) {
      /* Zillow API NEARBY WITHIN 5 MILES call
      * -- Will use the shared lat and shared long */
      fetch('https://zillow-free.p.rapidapi.com/properties/nearby/' + this.dataService.sharedLat + '/' +
        this.dataService.sharedLong + '?min_price=0&max_price=0&page=1&radius=5', {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '',
          'x-rapidapi-host': 'zillow-free.p.rapidapi.com'
        }
      })
        .then(response => {
          return response.json().then((data) => {
            this.nearby_houses = data.result;
          }).catch(err => {
            console.error(err);
          });
        });
    }

    if (this.dataService.sharedState !== undefined){
      /* Great Schools API call
      *  -- Will use the shared state, shared lat, and shared long */
        this._apiService.getSchools(this.dataService.sharedState, this.dataService.sharedLat, this.dataService.sharedLong)
          .subscribe(data => this.schools_list = data.schools.school);
     }
     else{
      console.log('Error: Shared state is ' + this.dataService.sharedState);
     }

    if (this.dataService.sharedZipcode !== undefined){
      /* Socrata API call and Creation of Chart
      * -- Will use the shared zipcode */
      this._apiService.getSocrataCrimes()
        .subscribe((responses: any) => {
          Object.keys(responses).map(k => {
            if (responses[k].zip_code === this.dataService.sharedZipcode){
              const i = responses[k].description;
              if (i !== undefined){
                this.crime_chart.push(i);
              }
            }
          });

          /* Sort the array and create another array for count of offenses */
          this.crime_chart.sort();
          this.createCount([...new Set(this.crime_chart)]);
          this.randomizeColors();

          /* Create the chart */
          this.chart = new Chart('canvas', {
            type: 'bar',
            data: {
              labels: [...new Set(this.crime_chart)], // Pass in unique set as the label
              datasets: [
                {
                  label: 'Number of Reported Crimes Committed (2020) ' + this.dataService.sharedZipcode,
                  data: this.crime_count, // Insert the associated data
                  backgroundColor: this.colors,
                  borderColor: this.colors,
                  borderWidth: 1
                }]
            },
            options: {
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
            }
          });
        });

    }
    else{
      console.log('Error: Shared zipcode is ' + this.dataService.sharedZipcode);
    }


  }

  /* Helper function that finds the total number of specified offense */
  findCount(value: string): number {
    length = this.crime_chart.filter(item => item === value).length;
    return length;
  }

  /* Helper function that creates the crime_count array for total number of offenses */
  createCount(value: any[]): void{
    let counter = 0;
    for (const valueItem of value){
      this.crime_count.push(this.findCount(value[counter]));
      counter++;
    }
  }

  /* Helper function that randomizes colors for bars */
  randomizeColors(): void{
    const visibility = 0.2;
    const maxValue = 255;
    const minValue = 1;
    this.crime_count.forEach(item => {
      const red = Math.floor(Math.random() * (maxValue + minValue));
      const green = Math.floor(Math.random() * ((maxValue + minValue)));
      const blue = Math.floor(Math.random() * ((maxValue + minValue)));
      const items = [red, green, blue, visibility];
      this.colors.push(String('rgba(' + items.toString() + ')'));
    });
  }

}
