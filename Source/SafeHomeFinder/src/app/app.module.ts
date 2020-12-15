import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ResultComponent } from './result/result.component';
import {AppRoutingModule} from './app-routing.module';
import {NavbarComponent} from './navbar/navbar.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import {DataService} from './service/data.service';
import {AuthService} from './service/auth.service';
import { SignupComponent } from './signup/signup.component';
import { CommonModule } from '@angular/common';



import {environment} from '../environments/environment';

// Fire base module
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import {UserService} from './service/user.service';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ResultComponent,
    GoogleMapComponent,
    LoginComponent,
    NavbarComponent,
    SignupComponent,
    ProfileComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [DataService, AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
