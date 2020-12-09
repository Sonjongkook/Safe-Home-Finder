import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ResultComponent } from './result/result.component';
import {AppRoutingModule} from './app-routing.module';
import { GoogleMapComponent } from './google-map/google-map.component';
import {DataService} from './data.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ResultComponent,
    GoogleMapComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
