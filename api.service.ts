import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  /* we can change the url keyword by bring from the data.
  private Great_Schools_Url = 'https://api.greatschools.org/schools/CA/Alameda?key='; */

  /* same, change of url for different data sets*/
  private Crime_Data_Url =
    'https://api.usa.gov/crime/fbi/sapi/api/nibrs/aggravated-assault/offense/states/MO/count?API_KEY=xUn8TaHfA66ut93UvpkIUxtudaY0Ub8gvrqCdSSl';

  constructor(private http: HttpClient) { }

  /* getSchools() {
    return this.http.get(this.Great_Schools_Url);
  } */

  getCrimes() {
    return this.http.get(this.Crime_Data_Url);
  }
}
