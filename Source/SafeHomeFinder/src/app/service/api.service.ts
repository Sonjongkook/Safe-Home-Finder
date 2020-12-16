import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  /* Great Schools API Key */
  private GreatSchoolsAPIKey = '';  ///////// GREAT SCHOOLS API KEY

  /* Realtor API Key */
  private Realtor_API = ''; ///////// REALTOR API KEY

  /* Socrata API URL specifically for KCMO. */
  private Socrata_KCMO_URL = '';

  constructor(private http: HttpClient) {
  }

  /* Method that takes STATE, LAT, and LONG.
  * Returns the Great Schools XML data. */
  getSchools(state: string, lat: string, long: string) {
    return this.http.get('https://api.greatschools.org/schools/nearby?key=' + this.GreatSchoolsAPIKey + '&state=' + state + '&lat='
    + lat + '&lon=' + long + '&radius=5&limit=5');
  }

  /* Method that takes CITY, and STATE.
  * Returns the Realtor latest 10 listing. */
  getHomes(city, state) {
    return fetch('https://realtor.p.rapidapi.com/properties/v2/list-for-sale?city=' + city + '&limit=15&offset=0&state_code=' + state +
    '&sort=newest&is_pending=false&is_new_plan=false', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': this.Realtor_API,
        'x-rapidapi-host': 'realtor.p.rapidapi.com'
      }
    });
  }

  /* Method that takes PROPERTY ID.
  * Returns the Realtor 5 similar houses. */
  getSimilarHomes(propId){
    return fetch('https://realtor.p.rapidapi.com/properties/list-similarities?property_id=' + propId
      + '&limit=5&prop_status=for_sale', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': this.Realtor_API,
        'x-rapidapi-host': 'realtor.p.rapidapi.com'
      }
    });
  }

  /* Method that takes PROPERTY ID.
  * Returns the Realtor house detail. */
  getHomeDetail(propId){
    return fetch('https://realtor.p.rapidapi.com/properties/v2/detail?property_id=' + propId, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': this.Realtor_API,
        'x-rapidapi-host': 'realtor.p.rapidapi.com'
      }
    });
  }

  /* Methods that takes no parameters
  * Returns the Socrata crime data */
  getSocrataCrimes() {
    return this.http.get(this.Socrata_KCMO_URL);
  }

}
