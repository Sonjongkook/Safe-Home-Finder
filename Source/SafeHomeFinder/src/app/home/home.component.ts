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
  @ViewChild('zipcodeInput') zipcode: Element;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
  }

  /* Takes user input from Search page and allows access to other components */
  getSearchResults(){
    this.dataService.sharedAddress = this.addr.nativeElement.value;
    this.dataService.sharedCity = this.city.nativeElement.value;
    this.dataService.sharedState = this.state.nativeElement.value;
    this.dataService.sharedZipcode = this.state.nativeElement.value;
  }
}
