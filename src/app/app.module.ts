import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './authInterceptor/error.Interceptor'
import { JwtInterceptor } from './authInterceptor/jwt.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavibarComponent } from './top-navibar/top-navibar.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthenticationService } from './services/authentication.service';
import { FlightsComponent } from './flights/flights.component';
import { HotelsComponent } from './hotels/hotels.component';
import { CarsComponent } from './cars/cars.component';
import { AgmCoreModule } from '@agm/core';
import { MaterialModule } from './material/material.module';

import { FusionChartsModule } from 'angular-fusioncharts';

// Import FusionCharts library
import * as FusionCharts from 'fusioncharts';

// Load FusionCharts Individual Charts
import * as Charts from 'fusioncharts/fusioncharts.charts';

// Use fcRoot function to inject FusionCharts library, and the modules you want to use
FusionChartsModule.fcRoot(FusionCharts, Charts)

// toast messages
import { CommonModule, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from './profile/profile.component';
import { AvioCompanyProfileComponent } from './avio-company-profile/avio-company-profile.component';
import { FriendsComponent } from './friends/friends.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AvioCompanyAdminPanelComponent } from './avio-company-admin-panel/avio-company-admin-panel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AvioCompanyModule } from './avio-company/avio-company.module';
import { FlightSeatComponent } from './flight-seat/flight-seat.component';
import { FlightSeatAdminComponent } from './flight-seat-admin/flight-seat-admin.component';
import { FlightFriendsComponent } from './flight-friends/flight-friends.component';
import { FlightPassengersComponent } from './flight-passengers/flight-passengers.component';
import { HotelCompanyProfileComponent } from './hotel-company-profile/hotel-company-profile.component';
import { HotelCompanyAdminPanelComponent } from './hotel-company-admin-panel/hotel-company-admin-panel.component';
import { HotelCompanyModule } from './hotel-company/hotel-company.module';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { FlightFriendConfirmComponent } from './flight-friend-confirm/flight-friend-confirm.component';
import { RoomSearchComponent } from './room-search/room-search.component';
import { SystemAdminOptionsComponent } from './system-admin-options/system-admin-options/system-admin-options.component';

@NgModule({

  declarations: [
    AppComponent,
    TopNavibarComponent,
    FooterComponent,
    RegisterComponent,
    SignInComponent,
    FlightsComponent,
    HotelsComponent,
    CarsComponent,
    ProfileComponent,
    AvioCompanyProfileComponent,
    FriendsComponent,
    HomepageComponent,
    AvioCompanyAdminPanelComponent,
    FlightSeatComponent,
    FlightSeatAdminComponent,
    FlightFriendsComponent,
    FlightPassengersComponent,
    HotelCompanyProfileComponent,
    HotelCompanyAdminPanelComponent,
    FlightSearchComponent,
    FlightFriendConfirmComponent,
    RoomSearchComponent,
    SystemAdminOptionsComponent
  ],
  imports: [
    FusionChartsModule,
    BrowserModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBdHLjkFxUCeb1KLQ4I3aarGBR8UEiLTcw'
    }),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    AvioCompanyModule,
    HotelCompanyModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],

  providers: [ DatePipe,AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent],
 
})

export class AppModule { }
