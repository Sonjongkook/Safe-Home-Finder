import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private sharedAddress = new BehaviorSubject('');
  private sharedCity = new BehaviorSubject('');
  private sharedState = new BehaviorSubject('');
  private sharedZipcode = new BehaviorSubject('');
  private sharedLat = new BehaviorSubject('');
  private sharedLong = new BehaviorSubject('');
  private sharedPropertyID = new BehaviorSubject('');

  address = this.sharedAddress.asObservable();
  city = this.sharedCity.asObservable();
  state = this.sharedState.asObservable();
  zipcode = this.sharedZipcode.asObservable();
  lat = this.sharedLat.asObservable();
  long = this.sharedLong.asObservable();
  propID = this.sharedPropertyID.asObservable();

  constructor() {
  }

  /* A whole bunch of setters */
  setAddress(addr: string): void {
    this.sharedAddress.next(addr);
  }

  setCity(city: string): void {
    this.sharedCity.next(city);
  }

  setState(state: string): void {
    this.sharedState.next(state);
  }

  setZip(zip: string): void {
    this.sharedZipcode.next(zip);
  }

  setLat(lat: string): void {
    this.sharedLat.next(lat);
  }

  setLong(long: string): void {
    this.sharedLong.next(long);
  }

  setPropID(propID: string): void {
    this.sharedPropertyID.next(propID);
  }
}
