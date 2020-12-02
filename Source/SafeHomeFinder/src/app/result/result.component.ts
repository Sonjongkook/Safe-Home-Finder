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

  private Zillow_API = ''; /////////////// This is where the ZILLOW API KEY GOES ////////////////

  /* list for great schools*/
  schools_list = [];

  /* list for zillow houses */
  home_list = [];

  /* Variables for Socrata data*/
  crime_chart = [];
  crime_count = [];

  /* Variables for Socrata charts */
  chart: [];
  colors = [];


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
          this.home_list = data.result;
        }).catch(err => {
          console.error(err);
        });
      });

    /* Socrata API call and Creation of Chart
    * Parameters: None
    * -- Will use the shared zipcode */
    this._apiService.getSocrataCrimes()
      .subscribe((responses: any) => {
        Object.keys(responses).map(k => {
          if (responses[k].zip_code === '64111'){ // Add the shared Zipcode here
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
              label: 'Number of Reported Crimes Committed (2020)',
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
      let red = Math.floor(Math.random() * (maxValue + minValue));
      let green = Math.floor(Math.random() * ((maxValue + minValue)));
      let blue = Math.floor(Math.random() * ((maxValue + minValue)));
      const items = [red, green, blue, visibility];
      this.colors.push(String('rgba(' + items.toString() + ')'));
    });
  }

}
