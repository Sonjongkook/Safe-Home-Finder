import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  sharedAddress: string;
  sharedCity: string;
  sharedState: string;

  constructor() { }
}
