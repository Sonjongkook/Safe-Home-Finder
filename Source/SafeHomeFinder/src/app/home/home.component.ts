import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../data.service';

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


  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
  }

  /* When user clicks submit button, will call this method. Input grabbed. */
  getSearchResults(){
    this.dataService.sharedAddress = this.addr.nativeElement.value;
    this.dataService.sharedCity = this.city.nativeElement.value;
    this.dataService.sharedState = this.state.nativeElement.value;
  }


}
