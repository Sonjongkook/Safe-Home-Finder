import { Component, OnInit } from '@angular/core';
import {ApiService} from '../service/api.service';
import {DataService} from '../service/data.service';
import {Chart} from 'node_modules/chart.js';
import {House} from '../model/house.model';
import {AngularFirestore} from '@angular/fire/firestore';



@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private _apiService: ApiService, private dataService: DataService, private db: AngularFirestore) {
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
  private newUrl: string;

  /* For User database Query */
  private newEmail: string;

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

  // House object for CRUD
  house: House = new House();

  /* Function that refreshes results page with new data */
  refresh(newVals: any): void {
    this.dataService.setPropID(newVals.property_id);
    this.dataService.setAddress(newVals.location.address.line);
    this.dataService.setCity(newVals.location.address.city);
    this.dataService.setZip(newVals.location.address.postal_code);
    this.dataService.setLat(newVals.location.address.coordinate.lat);
    this.dataService.setLong(newVals.location.address.coordinate.lon);
    this.ngOnInit();
  }

  ngOnInit(): void {

    console.log('this is the property id: ' + this.newPropID);
    console.log('this is the address: ' + this.newAddr);
    console.log('this is the city: ' + this.newCity);
    console.log('this is the state: ' + this.newState);
    console.log('this is the zip code: ' + this.newZipcode);
    console.log('this is the lattitude: ' + this.newLatitude);
    console.log('this is the longitude: ' + this.newLongitude);

    // Getting the shared data from DataService
    this.dataService.propID.subscribe(propID => this.newPropID = propID);
    this.dataService.address.subscribe(address => this.newAddr = address);
    this.dataService.city.subscribe(city => this.newCity = city);
    this.dataService.state.subscribe(state => this.newState = state);
    this.dataService.zipcode.subscribe(zipcode => this.newZipcode = zipcode);
    this.dataService.lat.subscribe( lat => this.newLatitude = lat);
    this.dataService.long.subscribe( long => this.newLongitude = long);
    this.dataService.url.subscribe(url => this.newUrl = url);

    // Getting the shared data from EmailService and this is the key to access FireStorage
    if (localStorage.getItem('email')){
      this.newEmail = localStorage.getItem('email');
    }

    // this.newPropID = 'M7744104915';
    // this.newZipcode = '';
    // this.newLatitude = '';

    if (this.newPropID !== undefined) {
      /* Realtor API similar homes for sale
      * Uses the home's property ID */
      fetch('https://realtor.p.rapidapi.com/properties/list-similarities?property_id=' + this.newPropID
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

      /* Realtor API displays house that was clicked on
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
                    borderWidth: 1,
                    fontColor: '#ffffff',
                  }]
              },
              options: {
                legend: {
                  display: false},
                title: { display: true, fontColor: '#ffffff', fontSize: '15',
                  text: 'Number of Reported Crimes (2020) for ' + this.newZipcode},
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                  yAxes: [{
                    ticks: {
                      beginAtZero: true,
                      stepSize: 1,
                      fontColor: '#ffffff'
                    }
                  }],
                  xAxes: [{
                    ticks: {
                      fontColor: '#ffffff'
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
    const visibility = 1;
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

  /* Function that adds Favorite house to the House Collection */
  addFavoritehouse(): void {
    this.house.Addr = this.newAddr;
    this.house.City = this.newCity;
    this.house.Zipcode = this.newZipcode;
    this.house.PropID = this.newPropID;
    this.house.Url = this.newUrl;
    let unsubscribe;

    console.log(this.newEmail);
    // Query User data base with email
    const doc = this.db.collection('User', ref => ref.where('email', '==', this.newEmail));


    // Add House to the favoritelist
    doc.snapshotChanges().subscribe((res: any) => {
      const id = res[0].payload.doc.id;
      // Create subcollection House for User collection
      this.db.collection('User/' + id + '/House').doc(this.house.PropID).set(Object.assign({}, this.house));
      unsubscribe();
    });

  }
}
