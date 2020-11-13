import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {DataService} from '../data.service';


@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {

  map: any;
  home_list = [];
  crime_list = [];

  /* Zillow API key and URL string */
  private updated_Zillow_URL: string;
  //private Zillow_API = 'c81d24b394mshc408f494c11731dp14a2d9jsna66cfaba7a6c'; // Sandy's Zillow API Key

  constructor(private _apiService: ApiService, private dataService: DataService) {
  }

  ngOnInit(): void {
    // Variables accessed from Data Service Component.
    // Printing to console for Verification.
    console.log('Google Map Component: ' + this.dataService.sharedAddress);
    console.log('Google Map Component: ' + this.dataService.sharedCity);
    console.log('Google Map Component: ' + this.dataService.sharedState);
    console.log('Google Map Component: ' + this.dataService.sharedZipcode);

    // Updated Zillow URL based on Zipcode
    // Parameters: dataService.sharedZipcode
    // --Will need to find way to find the Zipcode if given just Address or CityState
    this.updated_Zillow_URL = 'https://zillow-free.p.rapidapi.com/properties/zipcode/' + this.dataService.sharedZipcode +
      '?min_price=0&page=1&max_price=0';

    /* Zillow Rapid API call
    * Parameters: updated_Zillow_URL and Zillow_API */
    fetch(this.updated_Zillow_URL, {
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
          return this.home_list;
        }).then((list) => {
          this.initMap(list);
        }).catch(err => {
          console.error(err);
        });
      });

    /* FBI Crime API call
    * Parameters: dataService.sharedState
    * --Will need to find way to find state if given Zipcode and/or Address */
    this._apiService.getFBICrimes(this.dataService.sharedState)
      .subscribe((responses: any) => {
        this.crime_list = Object.keys(responses.results).map(function (k) {
          var i = responses.results[0];
          return {year: i.year, state: i.state_abbr, violent_crime: i.violent_crime, homicide: i.homicide,
            robbery: i.robbery, aggravated_assault: i.aggravated_assault, property_crime: i.property_crime,
            burglary: i.burglary, motor_vehicle_theft: i.motor_vehicle_theft};
        });

      });
  }

  /* Method that initializes Google Map
  * Parameters: home_list???? Please check this parameter.
  */
  initMap(homelist) {
    let coords = new google.maps.LatLng(homelist[0].home.latitude, homelist[0].home.longitude);
    let mapOptions: google.maps.MapOptions = {
      center: coords,
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions
    );
    console.log(homelist);

    // Iterate through the home_list and add markers.
    for (let house of homelist) {
      console.log(house.home.latitude);
      let coords = new google.maps.LatLng(house.home.latitude, house.home.longitude);
      let marker: google.maps.Marker = new google.maps.Marker({
        map: this.map,
        position: coords
      });

      // Displays the home's selling status, price, address, image, # bedrooms, and # bathrooms.
      let contentString = `<div>${house.home.homeStatus}</div>` + `<div>Price: ${house.home.price}</div>` +
        `<div>${house.home.streetAddress}</div>` + `<img height="100" width="100" src=${house.home.watchImageLink}>`
      + `<div># of Bedrooms: ${house.home.bedrooms}</div>` + `<div># of Bathrooms: ${house.home.bathrooms}</div>`;
      let infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      // Give events for marker.
      // Add event listener when hover the mouse.
      marker.addListener('mouseover', () => {
        infowindow.open(this.map, marker);
      });

      marker.addListener('mouseout', () => {
        infowindow.close();
      });

      // When click the marker redirect to the result page.
      marker.addListener('click', () =>{
        window.location.href = '/result';

      });


    }

  }
}
