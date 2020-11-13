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

  constructor(private _apiService: ApiService, private dataService: DataService) {
  }

  ngOnInit(): void {
    //We can modify url based on this shared data
    console.log(this.dataService.sharedAddress);
    console.log(this.dataService.sharedCity);
    console.log(this.dataService.sharedState);

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
          return this.home_list;
        }).then((list) => {
          this.initMap(list);
        }).catch(err => {
          console.error(err);
        });
      });
  }

  //initialize map
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

    //iterate homelist and assign it
    for (let house of homelist) {
      console.log(house.home.latitude);
      let coords = new google.maps.LatLng(house.home.latitude, house.home.longitude);
      let marker: google.maps.Marker = new google.maps.Marker({
        map: this.map,
        position: coords
      });

      let contentString = `<div>${house.home.streetAddress}</div>` + `<img height="100" width="100" src=${house.home.watchImageLink}>`;
      let infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      //give events for marker
      //add event listener when hover the mouse
      marker.addListener('mouseover', () => {
        infowindow.open(this.map, marker);
      });

      marker.addListener('mouseout', () => {
        infowindow.close();
      });
      //when click the marker redirect to the result page
      marker.addListener('click', () =>{
        window.location.href = '/result';
      });


    }

  }
}
