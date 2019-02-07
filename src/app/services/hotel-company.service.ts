import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { environment } from '../../environments/environment';
import { LocationModule } from '../avio-company/location/location.module';
import { CompanyModule } from '../hotel-company/company/company.module';
import { AdditionalServiceModule } from '../hotel-company/additional-services/additional-services.module';
import { RoomModule } from '../hotel-company/room/room.module';
import { RoomReservationModule } from '../hotel-company/room-reservation/room-reservation.module';

@Injectable({
  providedIn: 'root'
})
export class HotelCompanyService {

  constructor(private router: Router, private http: HttpClient, private authService: AuthenticationService) { }

  getCompany(idCompany: number) {
    return this.http.get<any>(environment.apiUrl + '/public/hotel/getCompany/' + idCompany).pipe(map(company => {
      return company;
    }
    ));
  }

  getCompanies() {
    return this.http.get<any>(environment.apiUrl + '/public/hotel/getCompanies').pipe(map(allComp => {
      return allComp;
    }
    ));
  }

  getCompanyFromUser() {
    var user = this.authService.getSessionUser();

    return this.http.post<any>(environment.apiUrl + '/auth/hotel/getCompanyFromUser', user
    ).pipe(map(company => {
      return company;
    }
    ));
  }

  public EditBasic(id: String, name: String, promotiveDescription: String) {
    return this.http.post<any>(environment.apiUrl + '/auth/hotel/editBasic', { id, name, promotiveDescription }
    ).pipe(map(company => {
      return company;
    }
    ));
  }

  public EditLocation(location: LocationModule, company: String) {
    return this.http.post<any>(environment.apiUrl + '/auth/hotel/EditLocation', { location, company }
    ).pipe(map(company => {
      return company;
    }
    ));
  }

  public AddRoom(hotelCompany: CompanyModule, floor: number, number: number, numberOfBeds: number, nextMonthPrice: number,
    nextThreeMonthPrice: number, nextHalfYearPrice: number, fastReserve: boolean) {

    return this.http.post<any>(environment.apiUrl + '/auth/hotel/AddRoom', {
      hotelCompany, floor, number, numberOfBeds, nextMonthPrice,
      nextThreeMonthPrice, nextHalfYearPrice, fastReserve
    }
    ).pipe(map(company => {
      return company;
    }
    ));
  }

  public EditRoom(id: number, hotelCompany: CompanyModule, floor: number, number: number, numberOfBeds: number,
    nextMonthPrice: number, nextThreeMonthPrice: number, nextHalfYearPrice: number, fastReserve: boolean) {

    alert("iz servisa editRoom: " + fastReserve);
    return this.http.post<any>(environment.apiUrl + '/auth/hotel/EditRoom', {
      id, hotelCompany,
      floor, number, numberOfBeds, nextMonthPrice, nextThreeMonthPrice, nextHalfYearPrice, fastReserve
    }
    ).pipe(map(company => {
      return company;
    }
    ));
  }

  public DeleteRoom(id: number, hotelCompany: CompanyModule) {
    return this.http.post<any>(environment.apiUrl + '/auth/hotel/DeleteRoom', { id, hotelCompany }
    ).pipe(map(company => {
      return company;
    }
    ));
  }

  public updateAdditionalServices(hotelId: String, additionalServices: Array<AdditionalServiceModule>) {

    for (let asm of additionalServices) {
      alert(asm.additionalServiceType)
    }

    return this.http.post<any>(environment.apiUrl + '/auth/hotel/UpdateAdditionalServices/' + hotelId, additionalServices
    ).pipe(map(company => {
      return company;
    }
    ));
  }

  public searchRooms(hotelName: String, hotelLocation: String, checkInDate: Date, checkOutDate: Date) {
    return this.http.get<any>(environment.apiUrl + '/public/hotel/searchRooms/' + hotelName + '/' + hotelLocation
      + '/' + checkInDate + '/' + checkOutDate)
      .pipe(map(searchedRooms => {
        return searchedRooms;
      }
      ));
  }

  public checkPriceRang(checkInDate: Date) {
    return this.http.get<any>(environment.apiUrl + '/public/hotel/checkPriceRang/' + checkInDate
    ).pipe(map(priceRang => {
      return priceRang;
    }
    ));
  }

  
  public makeReservation(roomReservation: RoomReservationModule) {
    return this.http.post<any>(environment.apiUrl + '/public/hotel/makeReservation',  roomReservation
    ).pipe(map(responseMessage => {
      return responseMessage;
    }
    ));
  }

  /*
  public reserveRoom(room: RoomModule) {
    return this.http.post<any>(environment.apiUrl + '/public/hotel/ReserveRoom', room
    ).pipe(map(s => {
      return s;
    }
    ));
  }
  */



  public getGraph(company: String) {
    return this.http.get<any>(environment.apiUrl + '/auth/hotel/getGraph/' + company
    ).pipe(map(count => {
      return count;
    }
    ));
  }

}
