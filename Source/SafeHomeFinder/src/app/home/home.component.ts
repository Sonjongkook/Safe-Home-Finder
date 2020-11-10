import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  // list for contain school
  schools_list = [];

  // list for contain house
  home_list = []

  // To do: Fetch data from zillow and socrata ODN

  constructor(private _apiService: ApiService) {
  }

  ngOnInit(): void {
    // getting schools data from great schools api
    this._apiService.getSchools().subscribe(data => this.schools_list = data.schools.school);
    // getting house info from zillow
    fetch('https://zillow-free.p.rapidapi.com/properties/zipcode/94105?min_price=0&page=1&max_price=0', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '90ef9ea20cmsh133dddc56df0deep178293jsnada2d7c2b39a',
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
  }
}
