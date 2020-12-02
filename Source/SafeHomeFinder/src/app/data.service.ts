import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  sharedAddress: string;
  sharedCity: string;
  sharedState: string;
  sharedZipcode: string;
  sharedLat: string;
  sharedLong: string;

  constructor() { }
}
