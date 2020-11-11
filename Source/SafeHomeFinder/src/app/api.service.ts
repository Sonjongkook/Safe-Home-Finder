import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // we can change the url keyword by bring from the data.
  private Great_Schools_Url = 'https://api.greatschools.org/schools/MO/Kansas_City?key=5b9df1e1eca307c301676bc5a9e68333';

  /* same, change of url for different data sets*/
  private Crime_Data_Url = 'https://api.usa.gov/crime/fbi/sapi/api/nibrs/aggravated-assault/offense/states/MO/count?API_KEY=xUn8TaHfA66ut93UvpkIUxtudaY0Ub8gvrqCdSSl';

  private Great_Schools_Review_Url = 'https://api.greatschools.org/reviews/school/CA/1?key=5b9df1e1eca307c301676bc5a9e68333';

  constructor(private http: HttpClient) { }

   getSchools() {
    return this.http.get(this.Great_Schools_Url);
  }

  getSchoolReview(){
    return this.http.get(this.Great_Schools_Review_Url);
  }

  getCrimes() {
    return this.http.get(this.Crime_Data_Url);
  }
}
