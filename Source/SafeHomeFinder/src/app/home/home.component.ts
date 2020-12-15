import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  @ViewChild('addressInput') addr: ElementRef;
  @ViewChild('cityInput') city: ElementRef;
  @ViewChild('stateInput') state: ElementRef;
  @ViewChild('zipcodeInput') zipcode: ElementRef;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
  }

  /* Takes user input from Search page and allows access to other components */
  getSearchResults(): void {
    if (this.addr.nativeElement.value !== null){
      this.dataService.setAddress(this.addr.nativeElement.value);
    }
    if (this.city.nativeElement.value !== null){
      this.dataService.setCity(this.city.nativeElement.value);
    }
    if (this.state.nativeElement.value !== null){
      this.dataService.setState(this.state.nativeElement.value);
    }
    if (this.zipcode.nativeElement.value !== null){
      this.dataService.setZip(this.zipcode.nativeElement.value);
    }
  }
}
