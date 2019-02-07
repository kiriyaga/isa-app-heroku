import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service'
import { LocationModule } from '../avio-company/location/location.module';
import { CompanyModule } from '../avio-company/company/company.module';
import { FlightStopModule } from '../avio-company/flight-stop/flight-stop.module';
import { FlightModule } from '../avio-company/flight/flight.module';
import { SeatModule } from '../avio-company/seat/seat.module';
import { OrderModule } from '../avio-company/order/order.module';

@Injectable({
  providedIn: 'root'
})
export class AvioCompanyService {

  constructor(private router: Router, private http: HttpClient, private authService: AuthenticationService) { }

  getCompany(idCompany: number) {
    return this.http.get<any>(environment.apiUrl + '/public/avio/getCompany/' + idCompany).pipe(map(company => {
      return company;
    }
    ));
  }

  getCompanies() {
    return this.http.get<any>(environment.apiUrl + '/public/avio/getCompanies').pipe(map(allComp => {
      return allComp;
    }
    ));
  }


  getFlight(idCompany: number) {
    return this.http.get<any>(environment.apiUrl + '/public/avio/getFlight/' + idCompany).pipe(map(flight => {
      return flight;
    }
    ));
  }

  getCompanyFromUser() {
    var user = this.authService.getSessionUser();
    return this.http.post<any>(environment.apiUrl + '/auth/avio/getCompanyFromUser', user
    ).pipe(map(company => {
      return company;
    }
    ));
  }

  public addDestination(location: LocationModule, company: String) {
    return this.http.post<any>(environment.apiUrl + '/auth/avio/AddDestination', { location, company }
    ).pipe(map(company => {
      return company;
    }
    ));
  }

  public reserveFlight(order: OrderModule) {
    return this.http.post<any>(environment.apiUrl + '/public/avio/ReserveFlight', order
    ).pipe(map(s => {
      return s;
    }
    ));
  }

  public EditDestination(location: LocationModule, company: String) {
    return this.http.post<any>(environment.apiUrl + '/auth/avio/EditDestination', { location, company }
    ).pipe(map(company => {
      return company;
    }
    ));
  }

  public EditLocation(location: LocationModule, company: String) {
    return this.http.post<any>(environment.apiUrl + '/auth/avio/editLocation', { location, company }
    ).pipe(map(company => {
      return company;
    }
    ));
  }

  public EditBasic(id: String, name: String, promotiveDescription: String) {
    return this.http.post<any>(environment.apiUrl + '/auth/avio/editBasic', { id, name, promotiveDescription }
    ).pipe(map(company => {
      return company;
    }
    ));
  }
  public DeleteDestination(location: LocationModule, company: String) {
    return this.http.post<any>(environment.apiUrl + '/auth/avio/DeleteDestination', { location, company }
    ).pipe(map(company => {
      return company;
    }
    ));
  }

  public AddFlight(company: CompanyModule, additionalPriceCheckBag: number, additionalPriceCarryBag: number, priceForTicket: number, startDestination: FlightStopModule, endDestination: FlightStopModule, travelTime: String, travelDistance: String, maxCheckBag:String,maxCarryBag:String) {
    return this.http.post<any>(environment.apiUrl + '/auth/avio/AddFlight', { company, additionalPriceCheckBag, additionalPriceCarryBag, priceForTicket, startDestination, endDestination, travelTime, travelDistance,maxCarryBag,maxCheckBag }
    ).pipe(map(company => {
      return company;
    }
    ));
  }

  public EditFlight(id:number,company: CompanyModule, additionalPriceCheckBag: number, additionalPriceCarryBag: number, priceForTicket: number, startDestination: FlightStopModule, endDestination: FlightStopModule, travelTime: String, travelDistance: String, maxCheckBag:number,maxCarryBag:number) {
    return this.http.post<any>(environment.apiUrl + '/auth/avio/EditFlight',{ id,company ,additionalPriceCheckBag, additionalPriceCarryBag, priceForTicket, startDestination, endDestination, travelTime, travelDistance,maxCarryBag,maxCheckBag }
    ).pipe(map(company => {
      return company;
    }
    ));
  }

  public GetEarnings(company:any,earnings1:Date,earnings2:Date) {
    return this.http.post<any>(environment.apiUrl + '/auth/avio/GetEarnings',{ company,earnings1,earnings2 }
    ).pipe(map(earnings => {
      return earnings;
    }
    ));
  }

  public AddFlightStop(flightStop: FlightStopModule,flight:FlightModule, company: CompanyModule) {
    return this.http.post<any>(environment.apiUrl + '/auth/avio/AddFlightStop', { flightStop, flight, company }
    ).pipe(map(company => {
      return company;
    }
    ));
  }

  public DeleteFlightStop(flightStop: FlightStopModule, flight: FlightModule, company: CompanyModule) {
    return this.http.post<any>(environment.apiUrl + '/auth/avio/DeleteFlightStop', { flightStop, flight, company}
    ).pipe(map(company => {
      return company;
    }
    ));
  }
  public DeleteFlight(flight:FlightModule, company: CompanyModule) {
    return this.http.post<any>(environment.apiUrl + '/auth/avio/DeleteFlight', { flight, company }
    ).pipe(map(company => {
      return company;
    }
    ));
  }

  public getFlightFromUser(index: number) {
    var user = this.authService.getSessionUser();
    return this.http.post<any>(environment.apiUrl + '/auth/avio/getFlightFromAdmin', { index, user }
    ).pipe(map(flight => {
      return flight;
    }
    ));
  }

  public saveSeats(seats: Array<SeatModule>, id: number) {
    return this.http.post<any>(environment.apiUrl + '/auth/avio/SaveSeats', { seats, id }
    ).pipe(map(flight => {
      return flight;
    }
    ));
  }

  public searchFlights(type: String, num: number, classs: String, from: String, to: String, takeoff: Date, landing: Date) {
    return this.http.get<any>(environment.apiUrl + '/public/avio/SearchForFlights/' + type + '/' + num + '/' + classs + '/' + from + '/' + to + '/' + takeoff + '/' + landing
    ).pipe(map(flights => {
      return flights;
    }
    ));
  }

  public checkConfirm(seat:number,flight:number,token:String) {
    return this.http.get<any>(environment.apiUrl + '/public/avio/CheckConfirm/' + seat + '/' + flight + '/' + token
    ).pipe(map(answer => {
      return answer;
    }
    ));
  }
  
  public confirmFlight(answer:String,seat:number,flight:number,token:String) {
    return this.http.get<any>(environment.apiUrl + '/public/avio/ConfirmFlight/'+answer+'/' + seat + '/' + flight + '/' + token
    ).pipe(map(answer => {
      return answer;
    }
    ));
  }

  public getGraph(company) {
    return this.http.get<any>(environment.apiUrl + '/auth/avio/GetGraph/'+company
    ).pipe(map(count => {
      return count;
    }
    ));
  }

}
