import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AgmCoreModule } from '@agm/core';
import { ResultComponent } from './result/result.component';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ResultComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    //change the api key for your local area
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCKAgIKofveuwkVAzggpI55qLtGqBidlDk'})
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
