import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ResultComponent} from './result/result.component';
import {GoogleMapComponent} from './google-map/google-map.component';
import {DataService} from './service/data.service';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {ProfileComponent} from './profile/profile.component';
import {AboutComponent} from './about/about.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/about', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent},
  { path: 'search', component: HomeComponent},
  { path: 'result', component: ResultComponent},
  { path: 'map', component: GoogleMapComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'about', component: AboutComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule],
  providers: [DataService],
})
export class AppRoutingModule { }
