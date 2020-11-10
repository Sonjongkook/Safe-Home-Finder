import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //we can change the url keyword by bring from the data
  private Great_Schools_Url = 'https://api.greatschools.org/schools/CA/Alameda?key=5b9df1e1eca307c301676bc5a9e68333'

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  getSchools() {
    return this.http.get(this.Great_Schools_Url)
  }


}

