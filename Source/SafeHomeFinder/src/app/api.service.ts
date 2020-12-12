import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  /* Great Schools API URL specifically for KCMO */
  private GreatSchoolsAPIKey = '';  ///////// This is where the GREAT SCHOOLS API KEY GOES ////////////////

  /* Socrata API URL specifically for KCMO */
  private Socrata_KCMO_URL = 'https://data.kcmo.org/resource/vsgj-uufz.json';

  constructor(private http: HttpClient) {
  }

  /* Method that takes STATE, LAT, and LONG
  * Returns the Great Schools XML data */
  getSchools(state: string, lat: string, long: string) {
    return this.http.get('https://api.greatschools.org/schools/nearby?key=' + this.GreatSchoolsAPIKey + '&state=' + state + '&lat='
    + lat + '&lon=' + long + '&radius=5&limit=5');
  }

  /* Methods currently does not take any input, will change later
  * Returns the Socrata JSON data */
  getSocrataCrimes() {
    return this.http.get(this.Socrata_KCMO_URL);
  }

}
