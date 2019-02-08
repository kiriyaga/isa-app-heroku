import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterComponent } from './register/register.component';
import { FlightsComponent } from './flights/flights.component';
import { HotelsComponent } from './hotels/hotels.component';
import { CarsComponent } from './cars/cars.component';
import { ProfileComponent } from './profile/profile.component';
import { AvioCompanyProfileComponent } from './avio-company-profile/avio-company-profile.component';
import { AvioAdminGuard } from './guards/avio-admin-guard.service';
import { FriendsComponent } from './friends/friends.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AvioCompanyAdminPanelComponent } from './avio-company-admin-panel/avio-company-admin-panel.component';
import { FlightSeatComponent } from './flight-seat/flight-seat.component';
import { FlightSeatAdminComponent } from './flight-seat-admin/flight-seat-admin.component';
import { FlightFriendsComponent } from './flight-friends/flight-friends.component';
import { FlightPassengersComponent } from './flight-passengers/flight-passengers.component';
import { HotelCompanyProfileComponent } from './hotel-company-profile/hotel-company-profile.component';
import { HotelCompanyAdminPanelComponent } from './hotel-company-admin-panel/hotel-company-admin-panel.component';
import { HotelAdminGuardService } from './guards/hotel-admin-guard.service';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { FlightFriendConfirmComponent } from './flight-friend-confirm/flight-friend-confirm.component';
import { RoomSearchComponent } from './room-search/room-search.component';
import { FirstTimeGuardService } from './guards/first-time-guard.service';
import { SystemAdminOptionsComponent } from './system-admin-options/system-admin-options/system-admin-options.component';
import { SystemAdminGuardService } from './guards/system-admin-guard.service';


const routes: Routes = [
  {
    path: 'signin',
    component: SignInComponent
  },
  {
    path: 'register',
    component: RegisterComponent 
  },
  {
    path: 'home',
    component: HomepageComponent , canActivate: [FirstTimeGuardService]
  },
  {
    path: 'avio',
    children: [
      { path: '', component: FlightsComponent, canActivate: [FirstTimeGuardService] },
      { path: 'company/:id', component: AvioCompanyProfileComponent, canActivate: [FirstTimeGuardService] },
      { path: 'adminpanel', component: AvioCompanyAdminPanelComponent , canActivate: [AvioAdminGuard,FirstTimeGuardService] },
      { path: 'seats/:id/:mode/:landing', component: FlightSeatComponent, canActivate: [FirstTimeGuardService] },
      { path: 'friends', component: FlightFriendsComponent, canActivate: [FirstTimeGuardService] },
      { path: 'passengers', component: FlightPassengersComponent, canActivate: [FirstTimeGuardService]},
      { path: 'adminpanel/seats/:id', component: FlightSeatAdminComponent,canActivate: [AvioAdminGuard,FirstTimeGuardService] },
      { path: 'search/:type/:num/:class/:from/:to/:takeoff/:landing', component: FlightSearchComponent,canActivate: [FirstTimeGuardService]},
      { path: 'confirm/:token/:id/:id2', component: FlightFriendConfirmComponent, canActivate: [FirstTimeGuardService]}
    ]
  },
  {
    path: 'hotels',
    children: [
      { path: '', component: HotelsComponent, canActivate: [FirstTimeGuardService] },
      { path: 'company/:id', component: HotelCompanyProfileComponent ,canActivate: [FirstTimeGuardService]},
      { path: 'adminpanel', component: HotelCompanyAdminPanelComponent , canActivate: [HotelAdminGuardService,FirstTimeGuardService] },
      { path: 'search/:hotelName/:hotelLocation/:checkInDate/:checkOutDate', component: RoomSearchComponent,canActivate: [FirstTimeGuardService] },
    ]
  },
  {
    path: 'cars',
    component: CarsComponent,canActivate: [FirstTimeGuardService]
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'friends',
    component: FriendsComponent, canActivate: [FirstTimeGuardService]
  },
  {
    path: 'sysadmin/options',
    component: SystemAdminOptionsComponent, canActivate: [ SystemAdminGuardService ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
