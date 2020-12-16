import {Component, OnInit} from '@angular/core';
import {ApiService} from '../service/api.service';
import {DataService} from '../service/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {

  constructor(private apiService: ApiService, private dataService: DataService, private router: Router) {
  }

  /* Variables to get the subscribed data from the dataService */
  address: string;
  city: string;
  state: string;
  zipcode: string;
  propId: string;
  type: string;

  /* Containers to store data */
  map: any;
  home_list = [];

  /* Method that calls right when google-map component opens
  * Calls on API requests to pull data for selected house  */
  ngOnInit(): void {

    // Getting the shared data from DataService
    this.dataService.address.subscribe(address => this.address = address);
    this.dataService.city.subscribe(city => this.city = city);
    this.dataService.state.subscribe(state => this.state = state);
    this.dataService.zipcode.subscribe(zipcode => this.zipcode = zipcode);
    this.dataService.propID.subscribe(propID => this.propId = propID);
    this.dataService.type.subscribe(Type => this.type = Type);
    console.log(this.type);

    /* Realtor pulls 10 of the newest home listings */
    this.apiService.getHomes(this.city, this.state, this.type).then(response => {
      return response.json().then((data) => {
        this.home_list = data.properties;
        return this.home_list;
      }).then((list) => {
        this.initMap(list);
      }).catch(e => {
        console.error(e);
      });
    });
  }
  /* Method that initializes Google Map
  * Maps all Realtor data onto Google Maps  */
  initMap(homelist): void {
    let coords = new google.maps.LatLng(homelist[0].address.lat, homelist[0].address.lon);
    let mapOptions: google.maps.MapOptions = {
      center: coords,
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions
    );

    // Iterate through the home_list and add markers.
    for (let house of homelist) {
      let coords = new google.maps.LatLng(house.address.lat, house.address.lon);
      let marker: google.maps.Marker = new google.maps.Marker({
        map: this.map,
        position: coords,
        title: house.property_id
      });

      // Displays the home's selling status, price, address, image, # bedrooms, and # bathrooms.
      let contentString = `<div>${house.prop_status}</div>` + `<div>Price: ${house.price}</div>` +
        `<div>${house.address.line}</div>` + `<img height="100" width="100" src=${house.thumbnail}>`
      + `<div># of Bedrooms: ${house.beds}</div>` + `<div># of Bathrooms: ${house.baths}</div>`;
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
      // Also assigns required property id, lat, and long to use for following page.
      marker.addListener('click', () => {
        this.dataService.setPropID(marker.getTitle().substring(1, marker.getTitle().length));
        this.dataService.setLat(String(marker.getPosition().lat()));
        this.dataService.setLong(String(marker.getPosition().lng()));
        // Send these to result component to make a House database.
        this.dataService.setAddress(house.address.line);
        this.dataService.setCity(house.address.city);
        this.dataService.setZip(house.address.postal_code);
        this.dataService.setUrl(house.rdc_web_url);
        this.router.navigate(['/result']);
      });
    }
  }
}
