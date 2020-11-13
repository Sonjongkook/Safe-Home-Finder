import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  /* Great Schools API URL specifically for KCMO */
  private Great_Schools_Url = 'https://api.greatschools.org/schools/MO/Kansas_City?key=5b9df1e1eca307c301676bc5a9e68333';

  /* FBI Crime Data API key and URL string */
  private updated_Crime_URL: string;
  private FBI_Crime_Data_API = 'iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv';

  /* Socrata API URL specifically for KCMO */
  private Socrata_KCMO_URL = 'https://data.kcmo.org/resource/vsgj-uufz.json';


  constructor(private http: HttpClient) { }

  /* Method currently does not take any input, will change later
  * Returns the Great Schools JSON data */
   getSchools() {
    return this.http.get(this.Great_Schools_Url);
  }

  /* Method takes a string: state (lowercase)
  * Returns the FBI Crime JSON data */
  getFBICrimes(state: string) {
    this.updated_Crime_URL = 'https://api.usa.gov/crime/fbi/sapi/api/summarized/estimates/states/' + state +
      '/2019/2019?API_KEY=' + this.FBI_Crime_Data_API;
    return this.http.get(this.updated_Crime_URL);
  }

  /* Methods currently does not take any input, will change later
  * Returns the Socrata ODN JSON data */
  getSocrataCrimes(){
    return this.http.get(this.Socrata_KCMO_URL);
  }
}
