import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  schools_list = [];
  constructor(private _apiService: ApiService) {
  }
  ngOnInit(): void {
    //getting schools data from great schools api
    this._apiService.getSchools().subscribe(data => this.schools_list = data.schools.school);
  }
}
