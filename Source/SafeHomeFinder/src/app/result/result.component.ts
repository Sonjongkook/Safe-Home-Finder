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

  private Realtor_API = '';  /////// This is where the REALTOR API KEY GOES //////

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
     //this.dataService.sharedZipcode = '64130';
     //this.dataService.sharedPropertyID = '7744104915';

    if (this.dataService.sharedPropertyID !== undefined) {
      /* Realtor API NEARBY WITHIN 5 MILES call
      * -- Will use the home's property ID number */
      fetch('https://realtor.p.rapidapi.com/properties/v2/list-similar-homes?property_id=' +
        this.dataService.sharedPropertyID, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': this.Realtor_API,
          'x-rapidapi-host': 'realtor.p.rapidapi.com'
        }
      })
        .then(response => {
          return response.json().then((data) => {
            if (data.data.home === null) {
              console.log('Returned similar homes is null.');
            } else if (data.data.home.related_homes.count === 0) {
              console.log('Returned similar homes count is 0.');
            } else {
              this.nearby_houses = data.data.home.related_homes.results;
            }
          }).catch(err => {
            console.error(err);
          });
        });
    }
    else{
      console.log('Error: Shared Property ID is ' + this.dataService.sharedPropertyID);
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
