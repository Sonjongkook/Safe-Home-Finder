import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  /* Great Schools API URL specifically for KCMO */
  private GreatSchoolsAPIKey = '';  /////////////// This is where the GREAT SCHOOLS API KEY GOES ////////////////
  private Great_Schools_Url = 'https://api.greatschools.org/schools/MO/Kansas_City?key=' + this.GreatSchoolsAPIKey;

  /* Socrata API URL specifically for KCMO */
  private Socrata_KCMO_URL = 'https://data.kcmo.org/resource/vsgj-uufz.json';

  constructor(private http: HttpClient) { }

  /* Method currently does not take any input, will change later
  * Returns the Great Schools JSON data */
   getSchools() {
    return this.http.get(this.Great_Schools_Url);
  }

  /* Methods currently does not take any input, will change later
  * Returns the Socrata ODN JSON data */
  getSocrataCrimes(){
    return this.http.get(this.Socrata_KCMO_URL);
  }
}
