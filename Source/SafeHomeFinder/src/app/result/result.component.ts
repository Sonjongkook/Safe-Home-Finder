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

  /* Variables to get the subscribed data from the dataService */
  private newAddr: string;
  private newCity: string;
  private newState: string;
  private newZipcode: string;
  private newLatitude: string;
  private newLongitude: string;
  private newPropID: string;

  /* list for Great Schools*/
  schools_list: any;

  /* list for Realtor houses */
  home_list = [];
  nearby_houses = [];

  /* Variables for Socrata data*/
  crime_chart = [];
  crime_count = [];

  /* Variables for Socrata charts */
  chart: [];
  colors = [];

  ngOnInit(): void {

    // Getting the shared data
    this.dataService.propID.subscribe(propID => this.newPropID = propID);
    this.dataService.address.subscribe(address => this.newAddr = address);
    this.dataService.city.subscribe(city => this.newCity = city);
    this.dataService.state.subscribe(state => this.newState = state);
    this.dataService.zipcode.subscribe(zipcode => this.newZipcode = zipcode);
    this.dataService.lat.subscribe( lat => this.newLatitude = lat);
    this.dataService.long.subscribe( long => this.newLongitude = long);

    if (this.newPropID !== undefined) {

      /* Realtor API displays house that was clicked on
      * Uses the home's property ID */
      fetch('https://realtor.p.rapidapi.com/properties/list-similarities?property_id=' + this.newPropID.substring(1, this.newPropID.length)
        + '&limit=5&prop_status=for_sale', {
        method: 'GET',
        headers: {
          'x-rapidapi-key': this.Realtor_API,
          'x-rapidapi-host': 'realtor.p.rapidapi.com'
        }
      })
        .then(response => {
          return response.json().then((data) => {
            if (data.results.similar_homes.count === null) {
              console.log('Returned similar homes is null.');
            } else if (data.results.similar_homes.count === 0) {
              console.log('Returned similar homes count is 0.');
            } else {
              this.nearby_houses = data.results.similar_homes.properties;
            }
          }).catch(err => {
            console.error(err);
          });
        });

      /* Realtor API similar homes for sale
      * Uses the home's property ID */
      fetch('https://realtor.p.rapidapi.com/properties/v2/detail?property_id=' + this.newPropID, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': this.Realtor_API,
          'x-rapidapi-host': 'realtor.p.rapidapi.com'
        }
      })
        .then(response => {
          return response.json().then((data) => {
            this.home_list = data.properties;
          }).catch(err => {
            console.error(err);
          });
        });
    }

    else{
      console.log('Property ID is ' + this.newPropID);
    }


    if (this.newState !== undefined && this.newLatitude !== undefined && this.newLongitude !== undefined){
      /* Great Schools API call
      *  -- Will use the shared state, shared lat, and shared long */
      this._apiService.getSchools(this.newState, this.newLatitude, this.newLongitude)
        .subscribe(data => this.schools_list = data.schools.school);
    }
    else{
      console.log('State, Latitude, and Longitude is ' + this.newState + ' ' + this.newLatitude + ' ' + this.newLongitude);
    }


    /* Socrata API call and Creation of Chart
    * Uses the shared zipcode */
    if (this.newZipcode !== undefined) {
      this._apiService.getSocrataCrimes()
        .subscribe((responses: any) => {
          Object.keys(responses).map(k => {
            this.findByZipcode(responses[k].zip_code, responses[k].description, this.newZipcode);
          });

          /* Sort the array and create another array for count of offenses */
          this.crime_chart.sort();
          this.createCount([...new Set(this.crime_chart)]);
          this.randomizeColors();

          if (this.crime_chart.length === 0) {
            console.log('The crime list is empty!!');
          } else {

            /* Create the chart */
            this.chart = new Chart('canvas', {
              type: 'bar',
              data: {
                labels: [...new Set(this.crime_chart)], // Pass in unique set as the label
                datasets: [
                  {
                    label: 'Number of Reported Crimes Committed (2020) ' + this.newZipcode,
                    data: this.crime_count, // Insert the associated data
                    backgroundColor: this.colors,
                    borderColor: this.colors,
                    borderWidth: 1
                  }]
              },
              options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                  yAxes: [{
                    ticks: {
                      beginAtZero: true,
                      stepSize: 1,
                    }
                  }]
                }
              }
            });
          }
        });
    } else {
      console.log('Zipcode is ' + this.newZipcode);
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
    this.crime_count.forEach(() => {
      const red = Math.floor(Math.random() * (maxValue + minValue));
      const green = Math.floor(Math.random() * ((maxValue + minValue)));
      const blue = Math.floor(Math.random() * ((maxValue + minValue)));
      const items = [red, green, blue, visibility];
      this.colors.push(String('rgba(' + items.toString() + ')'));
    });
  }

  /* Helper function that finds related crimes based on zipcode */
  findByZipcode(responseZip: any, responseDesc: any, sharZip: any): void {
    if (responseZip === sharZip && responseDesc !== undefined){
      this.crime_chart.push(responseDesc);
    }
  }


}
