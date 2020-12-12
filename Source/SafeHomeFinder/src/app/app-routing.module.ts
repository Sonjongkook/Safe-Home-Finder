import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ResultComponent} from './result/result.component';
import {GoogleMapComponent} from './google-map/google-map.component';
import {DataService} from './data.service';
import {LoginComponent} from './login/login.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: 'result', component: ResultComponent},
  { path: 'map', component: GoogleMapComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule],
  providers: [DataService],
})
export class AppRoutingModule { }
