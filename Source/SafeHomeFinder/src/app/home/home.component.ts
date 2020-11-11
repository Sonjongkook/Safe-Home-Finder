import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  @ViewChild('addressInput') addr: ElementRef;
  @ViewChild('cityInput') city: ElementRef;
  @ViewChild('stateInput') state: ElementRef;

  /* variables for user input */
  addressVal: any;
  cityVal: any;
  stateVal: any;


  constructor() {
  }

  ngOnInit(): void {
  }

  /* When user clicks submit button, will call this method. Input grabbed. */
  getSearchResults(){
    this.addressVal = this.addr.nativeElement.value;
    this.cityVal = this.city.nativeElement.value;
    this.stateVal = this.state.nativeElement.value;

    console.log('This button works');
    console.log(this.addressVal);
    console.log(this.cityVal);
    console.log(this.stateVal);
  }


}
